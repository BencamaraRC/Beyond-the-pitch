import 'dotenv/config';
import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL);

async function testConnection() {
    try {
        const result = await sql`SELECT version()`;
        console.log('Successfully connected to the database!');
        console.log('PostgreSQL version:', result[0].version);
    } catch (error) {
        console.error('Failed to connect to the database:', error);
    }
}

testConnection(); 