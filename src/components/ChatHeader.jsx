import { MessageCircleHeart } from 'lucide-react';

function ChatHeader() {
  return (
    <header className="chat-header">
      <div className="icon" aria-hidden="true">
        <MessageCircleHeart size={28} strokeWidth={2.5} />
      </div>
      <h1 className="text-2xl font-bold">Anjo Amigo - Chatbot</h1>
    </header>
  );
}

export default ChatHeader;
