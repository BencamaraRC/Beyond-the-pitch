import prisma from '../lib/prisma';
import type { AssessmentResult } from '../types';

export async function saveAssessment(userId: string, result: AssessmentResult, responses: Array<{ questionId: string; response: string; score?: any }>) {
    try {
        const assessment = await prisma.assessment.create({
            data: {
                userId,
                leadership: result.leadership,
                teamwork: result.teamwork,
                problemSolving: result.problemSolving,
                communication: result.communication,
                adaptability: result.adaptability,
                responses: {
                    create: responses.map(response => ({
                        questionId: response.questionId,
                        response: response.response,
                        score: response.score ? JSON.stringify(response.score) : null
                    }))
                }
            },
            include: {
                responses: true
            }
        });

        return assessment;
    } catch (error) {
        console.error('Error saving assessment:', error);
        throw error;
    }
}

export async function getAssessmentHistory(userId: string) {
    try {
        const assessments = await prisma.assessment.findMany({
            where: { userId },
            include: {
                responses: true
            },
            orderBy: {
                createdAt: 'desc'
            }
        });

        return assessments;
    } catch (error) {
        console.error('Error fetching assessment history:', error);
        throw error;
    }
}

export async function getLatestAssessment(userId: string) {
    try {
        const assessment = await prisma.assessment.findFirst({
            where: { userId },
            include: {
                responses: true
            },
            orderBy: {
                createdAt: 'desc'
            }
        });

        return assessment;
    } catch (error) {
        console.error('Error fetching latest assessment:', error);
        throw error;
    }
} 