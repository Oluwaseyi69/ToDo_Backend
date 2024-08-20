require('dotenv').config();

const express = require('express')
const app = express()
const connectDB = require('./config/Database');
const userRoutes = require('./routes/UserRoutes')
const todoRoutes = require('./routes/TodoRoutes')
const bodyParser = require('body-parser');


app.use(express.json());
app.use(bodyParser.json());

const PORT = process.env.PORT;

connectDB();

// Custom CORS middleware
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return res.sendStatus(204);
  }
  next();
});

app.use('/api/auth', userRoutes);
app.use('/api/todo', todoRoutes);





app.listen(PORT,()=>{
  console.log(`Server is running on port ${PORT}`)
});