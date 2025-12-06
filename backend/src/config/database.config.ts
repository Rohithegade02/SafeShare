import mongoose from 'mongoose';
import { GridFSBucket } from 'mongodb';
import dotenv from 'dotenv';
import path from 'path';

let bucket: GridFSBucket;
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });
console.log(process.env.MONGODB_URI);
export class DatabaseConfig {
    static async connect(): Promise<void> {
        try {
            const mongoUri = process.env.MONGODB_URI!;

            await mongoose.connect(mongoUri);

            // Initialize GridFS bucket
            const db = mongoose.connection.db;
            bucket = new GridFSBucket(db!, {
                bucketName: 'uploads'
            });

            console.log(' MongoDB connected successfully');
            console.log(' GridFS bucket initialized');

            mongoose.connection.on('error', (error) => {
                console.error(' MongoDB connection error:', error);
            });

            mongoose.connection.on('disconnected', () => {
                console.warn(' MongoDB disconnected');
            });

        } catch (error) {
            console.error(' Failed to connect to MongoDB:', error);
            process.exit(1);
        }
    }

    static async disconnect(): Promise<void> {
        await mongoose.disconnect();
        console.log('MongoDB disconnected');
    }

    static getGridFSBucket(): GridFSBucket {
        if (!bucket) {
            throw new Error('GridFS bucket not initialized. Call DatabaseConfig.connect() first.');
        }
        return bucket;
    }
}
