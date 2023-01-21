const express = require('express')
const router = express.Router();
const bodyParser = require('body-parser');

router.use(bodyParser.json());
console.log("intitiated users.js")

// Get all users
router.get('/users', (req, res) => {
    res.send(console.log("requested to users successful"));
    /*
    db.collection('users').find({}).toArray((err, users) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.send(users);
    });
    */
});

// Get a single user by ID
router.get('/users/:id', (req, res) => {
    db.collection('users').findOne({ _id: new ObjectID(req.params.id) }, (err, user) => {
        if (err) {
            return res.status(500).send(err);
        }
        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }
        res.send(user);
    });
});

// Create a new user
router.post('/users', (req, res) => {
    const newUser = req.body;
    db.collection('users').insertOne(newUser, (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.send(result.ops[0]);
    });
});

// Update an existing user
router.put('/users/:id', (req, res) => {
    const updatedUser = req.body;
    db.collection('users').updateOne({ _id: new ObjectID(req.params.id) }, { $set: updatedUser }, (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        if (result.matchedCount === 0) {
            return res.status(404).send({ message: 'User not found' });
        }
        res.send({ message: 'User updated' });
    });
});

// Delete a user
router.delete('/users/:id', (req, res) => {
    db.collection('users').deleteOne({ _id: new ObjectID(req.params.id) }, (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        if (result.deletedCount === 0) {
            return res.status(404).send({ message: 'User not found' });
        }
        res.send({ message: 'User deleted' });
    });
});

module.exports = router;