const mongoose = require('mongoose');
const URI = 'mongodb+srv://infospireeta:9zuFHGeSha9hSDiF@cluster0.wji2v.mongodb.net/spireeta?retryWrites=true&w=majority&appName=Cluster0';

async function updateDocs() {
  try {
    await mongoose.connect(URI);
    const db = mongoose.connection.db;
    
    const colNames = ['students', 'employees', 'enquiries', 'generalenquiries', 'resumeenquiries'];
    
    for (const name of colNames) {
        const res = await db.collection(name).updateMany(
            { deletedAt: { $exists: false } },
            { $set: { deletedAt: null } }
        );
        console.log(`Updated ${name}: ${res.modifiedCount} documents`);
    }

    console.log('Fix complete.');
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

updateDocs();
