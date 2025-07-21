import { useEffect, useRef } from 'react';

function ChatMessages({ messages }) {
  const lastMessageRef = useRef(null);

  useEffect(() => {
    // rola automaticamente para a última mensagem
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <main className="chat-messages" aria-live="polite" role="log">

      {messages.map((msg, idx) => {
        const isLast = idx === messages.length - 1;
        const classes = `message-bubble ${msg.sender === 'user' ? 'user-message' : 'bot-message'} show`;

        return (
          <div
            key={idx}
            className={classes}
            ref={isLast ? lastMessageRef : null}
            dangerouslySetInnerHTML={{
              __html: msg.text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>'),
            }}
          />
        );
      })}
    </main>
  );
}

export default ChatMessages;
