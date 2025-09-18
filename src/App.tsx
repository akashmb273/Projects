import React from 'react';
import { MessageSquare } from 'lucide-react';
import { useChat } from './hooks/useChat';
import { ChatWindow } from './components/ChatWindow';
import { MessageInput } from './components/MessageInput';

function App() {
  const { messages, isTyping, sendMessage } = useChat();

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 sm:p-8" style={{ fontFamily: 'Inter, sans-serif' }}>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center shadow-lg">
              <MessageSquare size={24} className="text-white" />
            </div>
            <h1 className="text-4xl font-bold text-blue-400">AI Chatbot</h1>
          </div>
          <p className="text-gray-400 text-lg">Your intelligent conversation partner</p>
        </div>

        {/* Chat Card */}
        <div 
          className="bg-gray-800 p-6 rounded-2xl shadow-2xl border border-gray-700"
          style={{ 
            boxShadow: '0 0 24px rgba(0,157,255,0.15)',
            maxWidth: '700px',
            margin: '0 auto'
          }}
        >
          <ChatWindow messages={messages} isTyping={isTyping} />
          <MessageInput onSendMessage={sendMessage} disabled={isTyping} />
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-gray-500 text-sm">
          <p>Powered by AI • Built with React & TypeScript</p>
        </div>
      </div>
    </div>
  );
}

export default App;