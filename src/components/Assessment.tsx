import React, { useRef, useEffect, useState } from 'react';
import { Send } from 'lucide-react';
import type { AssessmentResult } from '../types';
import { useAssessment } from '../hooks/useAssessment';
import { ChatMessage } from './ChatMessage';

interface AssessmentProps {
  onComplete: (result: AssessmentResult) => void;
  userId: string;
}

export function Assessment({ onComplete, userId }: AssessmentProps) {
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { messages, isTyping, handleUserInput, handleOptionSelect } = useAssessment({
    onComplete,
    userId
  });

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    await handleUserInput(input);
    setInput('');
  };

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-2">Career Assessment Chat</h2>
        <p className="text-gray-600 mb-6">
          Chat with our AI assistant to discover your ideal career path
        </p>
      </div>

      <div className="h-[400px] overflow-y-auto px-6 py-4 bg-gray-50">
        <div className="space-y-4">
          {messages.map((message) => (
            <ChatMessage
              key={message.id}
              message={message}
              onOptionSelect={handleOptionSelect}
            />
          ))}

          {isTyping && (
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-indigo-100 rounded-full">
                <div className="w-5 h-5 flex items-center justify-center">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce delay-100" />
                    <div className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce delay-200" />
                  </div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      <form onSubmit={handleSubmit} className="p-4 border-t">
        <div className="flex space-x-4">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            type="submit"
            disabled={!input.trim()}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </form>
    </div>
  );
}