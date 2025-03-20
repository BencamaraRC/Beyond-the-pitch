import type { AssessmentQuestion } from '../types';

export const initialMessage = {
    id: '1',
    type: 'bot' as const,
    content: "Hi there! I'm your career transition AI assistant. I'll help assess your skills and experiences to find the perfect career path for you. Let's start with your sports background - could you tell me about your role and position in your team?"
};

export const conversationFlow: AssessmentQuestion[] = [
    {
        id: 'leadership',
        question: "How did you typically handle challenging situations during important matches?",
        options: [
            {
                text: "I took charge and made quick decisions for the team",
                score: { leadership: 90, problemSolving: 85, adaptability: 80 }
            },
            {
                text: "I collaborated with teammates to find solutions",
                score: { teamwork: 90, communication: 85, leadership: 75 }
            },
            {
                text: "I stayed focused on my role and trusted the team structure",
                score: { adaptability: 80, teamwork: 75, problemSolving: 70 }
            }
        ]
    },
    {
        id: 'learning',
        question: "What aspects of your sports career do you think will translate well to a business environment?",
        type: 'open'
    },
    {
        id: 'interests',
        question: "Which of these areas interests you the most in terms of future career?",
        options: [
            {
                text: "Technology and Innovation",
                score: { problemSolving: 85, adaptability: 80 }
            },
            {
                text: "Business Strategy and Leadership",
                score: { leadership: 90, communication: 85 }
            },
            {
                text: "Sports Business and Marketing",
                score: { communication: 85, teamwork: 80 }
            }
        ]
    }
]; 