const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
app.use(cors());

const mongoURI = 'mongodb+srv://shlokp:73737373@cluster0.9x2ama4.mongodb.net/';

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  assignedIndexes: {
    type: [Number],
    default: [],
  },
  answers: {
    type: Object,
    default: {},
  },
});

const User = mongoose.model('User', userSchema);

const freqSchema = new mongoose.Schema({
    idx: { type: Number, required: true },
    freq: { type: Number, default: 0 },
  });
  
const FreqTable = mongoose.model('captionfreq', freqSchema);
  
app.use(express.json());

app.post('/register', async (req, res) => {
    try {
      const { email } = req.body;
  
    //   const existingUser = await User.findOne({ email });
    //   if (existingUser) {
    //     return res.status(409).json({ error: 'Email already exists' });
    //   }
  
      const newUser = new User({ email });
  
      const randomIdx = await FreqTable.find()
        .sort({ freq: 1, idx: 1 })
        .limit(10);
  
      const updatedIdxPromises = randomIdx.map(async (entry) => {
        entry.freq++;
        await entry.save();
      });
  
      await Promise.all(updatedIdxPromises);
  
      const assignedIndexes = randomIdx.map((entry) => entry.idx);
      newUser.assignedIndexes = assignedIndexes;
  
      await newUser.save();
      
      const rawData = fs.readFileSync('survey.json');
      const jsonData = JSON.parse(rawData);
      const filteredArray = jsonData.filter(item => assignedIndexes.includes(item.index));
      return res.status(201).json({
        message: 'User created successfully',
        user: newUser,
        quiz: filteredArray,
      });
    } catch (error) {
      console.error('Error creating user:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

const imagesPath = path.join(__dirname, 'images');

app.get('/image/:imageName', (req, res) => {
    const imageName = req.params.imageName;
    const imagePath = path.join(imagesPath, imageName);
    if (fs.existsSync(imagePath)) {
        res.sendFile(imagePath);
    } else {
        res.status(404).send('Image not found');
    }
});  

app.post('/submit', async (req, res) => {
    const { user_id, answers } = req.body;

    try {
      const user = await User.findById(user_id);
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      Object.assign(user.answers, answers);
  
      await user.save();
  
      return res.json({ message: 'Answers submitted successfully' });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: 'Internal server error' });
    }
});
  
mongoose.connection.on('connected', () => {
    console.log('Connected to MongoDB!');
    const port = 2000;
    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });
});
  
mongoose.connection.on('error', (err) => {
    console.error('Error connecting to MongoDB:', err);
});

mongoose.connection.on('disconnected', () => {
    console.log('Disconnected from MongoDB');
});
 