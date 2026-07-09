const { MongoClient } = require('mongodb');

async function checkBlogs() {
    const uri = 'mongodb+srv://synchronousbuilddigital_db_user:gegylOAm8rCnAuSc@cluster0.vknul9c.mongodb.net/?appName=Cluster0';
    const client = new MongoClient(uri);
    try {
        await client.connect();
        const db = client.db('test'); // Let's verify the db name. In db.js it connects without DB name so it uses default.
        // Actually, let's just use the lib/db.js connection
    } finally {
        await client.close();
    }
}
