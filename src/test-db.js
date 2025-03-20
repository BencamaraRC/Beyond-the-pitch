import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function testConnection() {
    try {
        // Test the connection by attempting to query the User model
        const userCount = await prisma.user.count();
        console.log('Successfully connected to the database!');
        console.log('Number of users in the database:', userCount);
    } catch (error) {
        console.error('Failed to connect to the database:', error);
    } finally {
        await prisma.$disconnect();
    }
}

async function createTestData() {
    try {
        // Create a test user
        const user = await prisma.user.create({
            data: {
                email: 'test@example.com',
                name: 'Test User',
                password: 'hashedPassword123',
                role: 'user',
                formerClub: 'FC Barcelona Youth',
                position: 'Forward',
                interests: JSON.stringify(['football', 'basketball']),
                skills: JSON.stringify(['dribbling', 'shooting']),
            },
        });
        console.log('Created test user:', user);

        // Create a test mentor
        const mentor = await prisma.mentor.create({
            data: {
                userId: user.id,
                name: 'Test Mentor',
                title: 'Professional Football Coach',
                company: 'Elite Sports Academy',
                industry: 'Sports Training',
                experience: 10,
                imageUrl: 'https://example.com/mentor.jpg',
                availability: JSON.stringify(['Monday', 'Wednesday', 'Friday']),
                bio: 'Experienced coach with 10 years of experience',
                expertise: JSON.stringify(['football tactics', 'strength training']),
                rating: 4.8,
                totalSessions: 150,
            },
        });
        console.log('Created test mentor:', mentor);

        // Create a test course
        const course = await prisma.course.create({
            data: {
                title: 'Advanced Football Training',
                description: 'Comprehensive course covering advanced football techniques',
                imageUrl: 'https://example.com/course.jpg',
                price: 199.99,
                duration: '8 weeks',
                level: 'Advanced',
                enrolled: 25,
                skills: JSON.stringify(['ball control', 'tactical awareness']),
            },
        });
        console.log('Created test course:', course);

        // Create a test assessment
        const assessment = await prisma.assessment.create({
            data: {
                userId: user.id,
                leadership: 4.5,
                teamwork: 4.8,
                problemSolving: 4.2,
                communication: 4.6,
                adaptability: 4.4,
            },
        });
        console.log('Created test assessment:', assessment);

        // Create a test assessment response
        const assessmentResponse = await prisma.assessmentResponse.create({
            data: {
                assessmentId: assessment.id,
                questionId: '1',
                response: 'I have been playing football for 5 years',
                score: JSON.stringify({ total: 85, breakdown: { technique: 90, knowledge: 80 } }),
            },
        });
        console.log('Created test assessment response:', assessmentResponse);

        // Create a test mentor booking
        const booking = await prisma.mentorBooking.create({
            data: {
                mentorId: mentor.id,
                userId: user.id,
                dateTime: new Date('2024-04-01T10:00:00Z'),
                status: 'pending',
            },
        });
        console.log('Created test booking:', booking);

    } catch (error) {
        console.error('Error creating test data:', error);
    } finally {
        await prisma.$disconnect();
    }
}

testConnection();
createTestData(); 