import mongoose from 'mongoose';

export const connectDB = async () => {
    const CONNECTION_STRING = 'mongodb+srv://admin:12345@cluster0.0ifpfe7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
    
    try {
        const db = await mongoose.connect(CONNECTION_STRING, {
            dbName: "APIPizzas",
        });
        console.log('Database is connected to:', db.connection.name);
    } catch (error) {
        console.log('Error: database connection failed', error);
        throw error;
    }
};
