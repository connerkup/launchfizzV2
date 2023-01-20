// Import required modules
const express = require('express');
const MongoClient = require('mongodb').MongoClient;

// Initialize express app
const app = express();

// Connect to MongoDB
const uri = "mongodb://127.0.0.1:27017/launchfizz";
const client = new MongoClient(uri, { useNewUrlParser: true });

client.connect()
  .then(client => {
    const collection = client.db("test").collection("devices");
    // perform actions on the collection object
    console.log("Connected to MongoDB");
  })
  .catch(err => {
    console.log("Error connecting to MongoDB:", err);
  });

// Create a simple route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Start the server
app.listen(3000, () => {
  console.log('Server started on http://localhost:3000');
});
