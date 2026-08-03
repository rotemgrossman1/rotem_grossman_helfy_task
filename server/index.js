const express = require('express');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT || 4000;
const tasksRouter = require('./routes/taskRoutes');
const cors = require('cors');

app.use(cors());
app.use(express.json());
app.use('/api/tasks', tasksRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});