// Import required modules
const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const path = require('path');
const usersRouter = require('./routes/users')

// Initialize express app
const app = express();

app.use('/users', usersRouter);

// Set view engine
app.set('view engine', 'ejs');

// Define views dir
app.set('views', path.join(__dirname, 'views'));

// Connect to MongoDB
const uri = "mongodb://127.0.0.1:27017/launchfizz";
const dbName = 'launchfizz_db';
const client = new MongoClient(uri, { useNewUrlParser: true });

client.connect() //initiate connection
    .then(client => {
        console.log("Connected successfully to server");
        const db = client.db(dbName);

        // Check if the Users collection already exists
        db.listCollections({ name: 'users' })
            .next()
            .then(collectionInfo => {
                if (!collectionInfo) {
                    // Create the Users collection
                    db.createCollection('users')
                        .then(() => {
                            console.log("Users collection created!");
                            //create index on username and email
                            db.collection('users').createIndex({ "username": 1 }, { unique: true });
                            db.collection('users').createIndex({ "email": 1 }, { unique: true });
                        })
                        .catch(err => {
                            console.log('Error creating Users collection: ', err);
                        });
                } else {
                    console.log("Users collection already exists");
                }
            });
        // Check if the productIdeas collection already exists
        db.listCollections({ name: 'productIdeas' })
            .next()
            .then(collectionInfo => {
                if (!collectionInfo) {
                    // Create the productIdeas collection
                    db.createCollection('productIdeas')
                        .then(() => {
                            console.log("productIdeas collection created!");
                            //create index on username and email
                            db.collection('productIdeas').createIndex({ "product_name": 1 }, { unique: false });
                        })
                        .catch(err => {
                            console.log('Error creating productIdeas collection: ', err);
                        });
                } else {
                    console.log("productIdeas collection already exists");
                }
            });
        // Check if the tags collection already exists
        db.listCollections({ name: 'tags' })
            .next()
            .then(collectionInfo => {
                if (!collectionInfo) {
                    // Create the tags collection
                    db.createCollection('tags')
                        .then(() => {
                            console.log("tags collection created!");
                            //create index on username and email
                            db.collection('tags').createIndex({ "tag": 1 }, { unique: true });
                        })
                        .catch(err => {
                            console.log('Error creating tags collection: ', err);
                        });
                } else {
                    console.log("tags collection already exists");
                }
            });
    }).catch(err => console.log('Error connecting to MongoDB: ', err));

app.use(express.static('client'));

// Create a simple route
app.get('/', (req, res) => {
    res.render('index');
});


// Start the server
app.listen(3000, () => {
    console.log('Server started on http://localhost:3000');
});
