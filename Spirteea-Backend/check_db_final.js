const mongoose = require('mongoose');
const URI = 'mongodb+srv://infospireeta:9zuFHGeSha9hSDiF@cluster0.wji2v.mongodb.net/spireeta?retryWrites=true&w=majority&appName=Cluster0';

async function checkAll() {
  try {
    await mongoose.connect(URI);
    const db = mongoose.connection.db;
    
    const collections = ['students', 'employees', 'enquiries', 'generalenquiries', 'resumeenquiries'];
    
    console.log('--- DB SUMMARY ---');
    for (const colName of collections) {
      const total = await db.collection(colName).countDocuments({});
      const visible = await db.collection(colName).countDocuments({ deletedAt: null });
      const deleted = await db.collection(colName).countDocuments({ deletedAt: { $ne: null } });
      console.log(`${colName}: Total=${total}, Visible=${visible}, SoftDeleted=${deleted}`);
    }
    console.log('-------------------');
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}
checkAll();
