import { MongoClient } from 'mongodb';

const options = {
    connectTimeoutMS: 5000,
    serverSelectionTimeoutMS: 5000
};

let client;
let clientPromise;

function getClientPromise() {
    if (clientPromise) {
        return clientPromise;
    }

    const uri = process.env.MONGODB_URI;
    if (!uri) {
        throw new Error('Please add your MONGODB_URI to environment variables.');
    }

    if (process.env.NODE_ENV === 'development') {
        // In development mode, use a global variable so that the value
        // is preserved across module reloads caused by HMR (Hot Module Replacement).
        if (!global._mongoClientPromise) {
            client = new MongoClient(uri, options);
            global._mongoClientPromise = client.connect();
        }
        clientPromise = global._mongoClientPromise;
    } else {
        // In production mode, it's best to not use a global variable.
        client = new MongoClient(uri, options);
        clientPromise = client.connect();
    }

    return clientPromise;
}


export async function connectToDatabase() {
    try {
        const clientInstance = await getClientPromise();
        const db = clientInstance.db();
        return { client: clientInstance, db };
    } catch (error) {
        console.error('Failed to connect to MongoDB:', error);
        throw error;
    }
}
