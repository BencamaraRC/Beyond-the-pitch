import { useState, useCallback } from 'react';
import type { Message, AssessmentResult } from '../types';
import { conversationFlow, initialMessage } from '../data/conversationFlow';
import { saveAssessment } from '../api/assessment';

interface UseAssessmentProps {
    onComplete: (result: AssessmentResult) => void;
    userId: string;
}

export function useAssessment({ onComplete, userId }: UseAssessmentProps) {
    const [messages, setMessages] = useState<Message[]>([initialMessage]);
    const [currentStep, setCurrentStep] = useState(0);
    const [isTyping, setIsTyping] = useState(false);
    const [assessmentScore, setAssessmentScore] = useState<AssessmentResult>({
        leadership: 0,
        teamwork: 0,
        problemSolving: 0,
        communication: 0,
        adaptability: 0
    });
    const [responses, setResponses] = useState<Array<{
        questionId: string;
        response: string;
        score?: any;
    }>>([]);

    const addMessage = useCallback((message: Message) => {
        setMessages(prev => [...prev, message]);
    }, []);

    const simulateTyping = useCallback(async (content: string) => {
        setIsTyping(true);
        await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000));
        setIsTyping(false);
        addMessage({ id: Date.now().toString(), type: 'bot', content });
    }, [addMessage]);

    const handleUserInput = useCallback(async (input: string) => {
        if (!input.trim()) return;

        // Add user message
        addMessage({
            id: Date.now().toString(),
            type: 'user',
            content: input
        });

        // Save response
        if (currentStep < conversationFlow.length) {
            const currentQuestion = conversationFlow[currentStep];
            setResponses(prev => [...prev, {
                questionId: currentQuestion.id,
                response: input
            }]);
        }

        // Process response based on conversation flow
        if (currentStep < conversationFlow.length) {
            const nextQuestion = conversationFlow[currentStep];
            await simulateTyping(nextQuestion.question);

            if (nextQuestion.options) {
                addMessage({
                    id: `mc-${Date.now()}`,
                    type: 'multiple-choice',
                    content: nextQuestion.question,
                    options: nextQuestion.options.map(opt => opt.text)
                });
            }

            setCurrentStep(prev => prev + 1);
        } else {
            // Assessment complete
            await simulateTyping("Thank you for sharing all that information! I've analyzed your responses and created a comprehensive profile of your strengths and potential career paths. Let's explore the opportunities that best match your unique skills and interests.");

            try {
                // Save assessment to database
                await saveAssessment(userId, assessmentScore, responses);
                onComplete(assessmentScore);
            } catch (error) {
                console.error('Error saving assessment:', error);
                await simulateTyping("I apologize, but there was an error saving your assessment. Please try again later.");
            }
        }
    }, [currentStep, addMessage, simulateTyping, assessmentScore, onComplete, userId, responses]);

    const handleOptionSelect = useCallback(async (option: string) => {
        addMessage({
            id: Date.now().toString(),
            type: 'user',
            content: option
        });

        const question = conversationFlow[currentStep - 1];
        const selectedOption = question.options?.find(opt => opt.text === option);

        // Save response with score
        setResponses(prev => [...prev, {
            questionId: question.id,
            response: option,
            score: selectedOption?.score
        }]);

        if (selectedOption?.score) {
            setAssessmentScore(prev => ({
                leadership: prev.leadership + (selectedOption.score.leadership || 0),
                teamwork: prev.teamwork + (selectedOption.score.teamwork || 0),
                problemSolving: prev.problemSolving + (selectedOption.score.problemSolving || 0),
                communication: prev.communication + (selectedOption.score.communication || 0),
                adaptability: prev.adaptability + (selectedOption.score.adaptability || 0)
            }));
        }

        // Move to next question
        if (currentStep < conversationFlow.length) {
            const nextQuestion = conversationFlow[currentStep];
            await simulateTyping(nextQuestion.question);

            if (nextQuestion.options) {
                addMessage({
                    id: `mc-${Date.now()}`,
                    type: 'multiple-choice',
                    content: nextQuestion.question,
                    options: nextQuestion.options.map(opt => opt.text)
                });
            }

            setCurrentStep(prev => prev + 1);
        } else {
            await simulateTyping("Perfect! I've gathered enough information to provide you with personalized career recommendations. Let's look at the opportunities that align with your profile.");

            try {
                // Save assessment to database
                await saveAssessment(userId, assessmentScore, responses);
                onComplete(assessmentScore);
            } catch (error) {
                console.error('Error saving assessment:', error);
                await simulateTyping("I apologize, but there was an error saving your assessment. Please try again later.");
            }
        }
    }, [currentStep, addMessage, simulateTyping, assessmentScore, onComplete, userId, responses]);

    return {
        messages,
        isTyping,
        handleUserInput,
        handleOptionSelect
    };
} 