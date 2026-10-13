// 1. Only load dotenv files when working locally
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const express = require('express');
const { mainRoute } = require("./routes/index");

const app = express();

// Middleware
app.use(express.json());


// Base Server Check Route
app.get('/', (req, res) => {
  res.send('Hello World! Your API server is up and running.');
});


// Routes
app.use('/api/v1/', mainRoute);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});