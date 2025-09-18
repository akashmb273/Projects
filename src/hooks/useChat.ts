import { useState, useCallback } from 'react';
import { Message, ChatState } from '../types/chat';

const generateId = () => Math.random().toString(36).substring(2) + Date.now().toString(36);

export const useChat = () => {
  const [chatState, setChatState] = useState<ChatState>({
    messages: [
      {
        id: generateId(),
        content: "Hello! I'm connected to the Flask backend. How can I help you today?",
        sender: 'bot',
        timestamp: new Date(),
      },
    ],
    isTyping: false,
  });

  const sendMessage = useCallback(async (content: string) => {
    if (!content.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: generateId(),
      content: content.trim(),
      sender: 'user',
      timestamp: new Date(),
    };

    setChatState(prev => ({
      ...prev,
      messages: [...prev.messages, userMessage],
      isTyping: true,
    }));

    try {
      // Call Flask backend
      const response = await fetch('http://localhost:5000/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: content.trim() }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      // Add bot response
      const botMessage: Message = {
        id: generateId(),
        content: data.reply || 'Sorry, I encountered an error processing your message.',
        sender: 'bot',
        timestamp: new Date(),
      };

      setChatState(prev => ({
        ...prev,
        messages: [...prev.messages, botMessage],
        isTyping: false,
      }));
    } catch (error) {
      console.error('Error calling chat API:', error);
      
      // Add error message
      const errorMessage: Message = {
        id: generateId(),
        content: 'Sorry, I\'m having trouble connecting to the server. Please make sure the Flask backend is running on port 5000.',
        sender: 'bot',
        timestamp: new Date(),
      };

      setChatState(prev => ({
        ...prev,
        messages: [...prev.messages, errorMessage],
        isTyping: false,
      }));
    }
  }, []);

  return {
    messages: chatState.messages,
    isTyping: chatState.isTyping,
    sendMessage,
  };
};