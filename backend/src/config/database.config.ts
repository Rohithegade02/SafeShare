import mongoose from 'mongoose';

export class DatabaseConfig {
    static async connect(): Promise<void> {
        try {
            const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/safeshare';

            await mongoose.connect(mongoUri);

            console.log(' MongoDB connected successfully');

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
}
