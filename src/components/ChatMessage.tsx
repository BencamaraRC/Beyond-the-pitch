import React from 'react';
import { User, Bot } from 'lucide-react';
import type { Message } from '../types';

interface ChatMessageProps {
    message: Message;
    onOptionSelect?: (option: string) => void;
}

export function ChatMessage({ message, onOptionSelect }: ChatMessageProps) {
    if (message.type === 'bot') {
        return (
            <div className="flex items-start space-x-2">
                <div className="p-2 bg-indigo-100 rounded-full">
                    <Bot className="w-5 h-5 text-indigo-600" />
                </div>
                <div className="bg-white rounded-lg p-4 max-w-md shadow-sm">
                    <p className="text-gray-800">{message.content}</p>
                </div>
            </div>
        );
    }

    if (message.type === 'user') {
        return (
            <div className="flex items-start space-x-2 justify-end">
                <div className="bg-indigo-600 rounded-lg p-4 max-w-md shadow-sm">
                    <p className="text-white">{message.content}</p>
                </div>
                <div className="p-2 bg-indigo-700 rounded-full">
                    <User className="w-5 h-5 text-white" />
                </div>
            </div>
        );
    }

    if (message.type === 'multiple-choice') {
        return (
            <div className="w-full bg-white rounded-lg p-4 shadow-sm">
                <p className="text-gray-800 mb-3">{message.content}</p>
                <div className="space-y-2">
                    {message.options?.map((option, index) => (
                        <button
                            key={index}
                            onClick={() => onOptionSelect?.(option)}
                            className="w-full text-left p-3 rounded-lg border border-gray-200 hover:border-indigo-500 hover:bg-indigo-50 transition-colors"
                        >
                            {option}
                        </button>
                    ))}
                </div>
            </div>
        );
    }

    return null;
} 