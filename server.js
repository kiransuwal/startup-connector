const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const app = express();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Database connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://kiransuwal:xNXDK0EyXXQ8dDeB@cluster007.hperanx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster007', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// Models
const Idea = require('./models/Idea');
const Investor = require('./models/Investor');

// View engine
app.set('view engine', 'ejs');

// Routes
app.get('/', (req, res) => {
    res.render('index');
});

app.post('/submit-idea', async (req, res) => {
    const newIdea = new Idea(req.body);
    await newIdea.save();
    res.send('Idea submitted! We will connect you to investors soon.');
});

app.post('/register-investor', async (req, res) => {
    const newInvestor = new Investor(req.body);
    await newInvestor.save();
    res.send('Thanks for registering as an investor!');
});

app.get('/ideas', async (req, res) => {
    const ideas = await Idea.find();
    res.json(ideas);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
