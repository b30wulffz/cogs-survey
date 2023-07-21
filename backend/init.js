const fs = require('fs');
const mongoose = require('mongoose');

const mongoURI = 'mongodb+srv://shlokp:73737373@cluster0.9x2ama4.mongodb.net/';

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const myTableSchema = new mongoose.Schema({
  idx: { type: Number, required: true },
  freq: { type: Number, default: 0 },
});

const MyTable = mongoose.model('captionfreq', myTableSchema);

async function createTable() {
  try {
    await MyTable.deleteMany({});
    const rawData = fs.readFileSync('survey.json');
    const jsonData = JSON.parse(rawData);
    const documents = jsonData.map(item => ({
      idx: item.index,
      freq: 0,
    }));

    await MyTable.insertMany(documents);
    console.log('Table created successfully.');
  } catch (error) {
    console.error('Error creating table:', error);
  } finally {
    mongoose.connection.close();
  }
}

createTable();
