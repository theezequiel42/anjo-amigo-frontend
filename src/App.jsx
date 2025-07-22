import { useEffect, useRef, useState } from 'react';
import knowledgeBase from './knowledgeBase';
import './styles/styles.css';
import ChatHeader from './components/ChatHeader';
import ChatMessages from './components/ChatMessages';
import ChatInput from './components/ChatInput';
import LoadingIndicator from './components/LoadingIndicator';

function App() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isVoiceMuted, setIsVoiceMuted] = useState(true);
  const chatRef = useRef(null);
  const hasWelcomed = useRef(false); // Evita múltiplas mensagens de boas-vindas

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const speak = (text) => {
    if (isVoiceMuted) return;
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = 'pt-BR';
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utter);
  };

  const addMessage = (text, sender = 'bot') => {
    const cleanedText = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    const message = { text: cleanedText, sender };
    setMessages((prev) => [...prev, message]);
    if (sender === 'bot') speak(text.replace(/\*\*(.*?)\*\*/g, '$1'));
  };

  const sendMessage = async (userText) => {
    if (!userText.trim()) return;

    addMessage(userText, 'user');
    setLoading(true);

    const normalized = userText.toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');

    // Busca local na base de conhecimento embutida
    for (const key in knowledgeBase) {
      const normKey = key.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
      if (normalized.includes(normKey)) {
        for (const response of knowledgeBase[key]) {
          addMessage(response);
          await delay(500);
        }
        setLoading(false);
        return;
      }
    }

    try {
      const resp = await fetch('http://82.29.61.210:8000/api/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: userText }),
      });

      const result = await resp.json();

      // Verifica se houve erro no backend
      if (result.error) {
        addMessage(`⚠️ ${result.error}`);
      }
      // Se a resposta for válida (lista de mensagens)
      else if (Array.isArray(result.messages)) {
        for (const r of result.messages) {
          addMessage(r);
          await delay(500);
        }
      }
      // Se formato inesperado
      else {
        addMessage("❌ Resposta inesperada do servidor.");
      }
    } catch (err) {
      console.error('[Backend Error]:', err);
      addMessage("Erro ao conectar com o servidor. Tente mais tarde.");
    } finally {
      setLoading(false);
    }
  };

  // Mensagem de boas-vindas na primeira carga
  useEffect(() => {
    if (hasWelcomed.current) return;
    hasWelcomed.current = true;

    const boasVindas = async () => {
      await delay(200);
      addMessage("Olá! Sou o **Anjo Amigo**, seu chatbot de apoio contra a violência doméstica em Fraiburgo.");
      await delay(800);
      addMessage("Posso te ajudar com informações sobre **leis**, seus direitos, tipos de violência e a rede de proteção.");
      await delay(800);
      addMessage("Como posso te ajudar hoje?");
    };

    boasVindas();
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="chat-container" ref={chatRef}>
        <ChatHeader />
        <ChatMessages messages={messages} />
        {loading && <LoadingIndicator />}
        <ChatInput
          onSend={sendMessage}
          isVoiceMuted={isVoiceMuted}
          setIsVoiceMuted={setIsVoiceMuted}
        />
      </div>
    </div>
  );
}

export default App;
