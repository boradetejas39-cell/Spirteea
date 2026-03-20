const mongoose = require('mongoose');
const URI = 'mongodb+srv://infospireeta:9zuFHGeSha9hSDiF@cluster0.wji2v.mongodb.net/spireeta?retryWrites=true&w=majority&appName=Cluster0';

async function checkAll() {
  try {
    await mongoose.connect(URI);
    const db = mongoose.connection.db;
    
    const collections = ['students', 'employees', 'enquiries', 'generalenquiries', 'resumeenquiries'];
    
    for (const colName of collections) {
      const total = await db.collection(colName).countDocuments({});
      const visible = await db.collection(colName).countDocuments({ deletedAt: null });
      const missingDeletedAt = await db.collection(colName).countDocuments({ deletedAt: { $exists: false } });
      console.log(`Collection ${colName}: Total=${total}, Visible(null)=${visible}, MissingDeletedAt=${missingDeletedAt}`);
    }
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}
checkAll();