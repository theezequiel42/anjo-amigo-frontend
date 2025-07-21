import { useEffect, useRef, useState } from 'react';
import { Mic, MicOff, Send, Volume2, VolumeX } from 'lucide-react';

function ChatInput({ onSend, isVoiceMuted, setIsVoiceMuted }) {
  const inputRef = useRef(null);
  const micButtonRef = useRef(null);
  const recognitionRef = useRef(null);
  const [isListening, setIsListening] = useState(false); // 👈 novo estado

  const handleSubmit = (e) => {
    e.preventDefault();
    const value = inputRef.current.value.trim();
    if (value) {
      onSend(value);
      inputRef.current.value = '';
    }
  };

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      console.warn('Reconhecimento de voz não suportado');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'pt-BR';
    recognition.interimResults = false;
    recognitionRef.current = recognition;

    const handleMicClick = () => recognition.start();
    const micBtn = micButtonRef.current;
    micBtn.addEventListener('click', handleMicClick);

    recognition.addEventListener('start', () => setIsListening(true));
    recognition.addEventListener('end', () => setIsListening(false));

    recognition.addEventListener('result', (e) => {
      const transcript = e.results[0][0].transcript;
      inputRef.current.value = transcript;
      onSend(transcript);
    });

    recognition.addEventListener('error', (e) => {
      console.error('[Reconhecimento de voz]', e);
      onSend('Desculpe, não consegui entender o que você disse.');
      setIsListening(false);
    });

    return () => {
      micBtn.removeEventListener('click', handleMicClick);
      recognition.removeEventListener('start', () => {});
      recognition.removeEventListener('end', () => {});
      recognition.removeEventListener('result', () => {});
      recognition.removeEventListener('error', () => {});
    };
  }, [onSend]);

  return (
    <form className="chat-input-area" onSubmit={handleSubmit}>
      <input
        id="user-input"
        ref={inputRef}
        className="chat-input"
        placeholder="Digite sua mensagem..."
        autoComplete="off"
        required
      />
      <button type="submit" className="icon-btn" title="Enviar mensagem" aria-label="Enviar">
        <Send size={20} />
      </button>

      <button
        type="button"
        ref={micButtonRef}
        className={`icon-btn ${isListening ? 'listening' : ''}`} // 👈 classe visual
        title="Falar"
        aria-label="Ativar reconhecimento de voz"
      >
        {isListening ? <MicOff size={20} /> : <Mic size={20} />}
      </button>

      <button
        type="button"
        className={`icon-btn ${isVoiceMuted ? 'muted' : ''}`}
        onClick={() => setIsVoiceMuted(!isVoiceMuted)}
        aria-pressed={!isVoiceMuted}
        aria-label="Ativar ou desativar leitura em voz alta"
        title="Ativar/Desativar voz"
      >
        {isVoiceMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
      </button>
    </form>
  );
}

export default ChatInput;
