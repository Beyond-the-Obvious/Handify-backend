'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
const PORT = process.env.PORT || 4000;

const mongoose = require('mongoose');
app.use(express.json());


// mongoose.connect(`${process.env.DATABASE_URL}`);


// requiring the ItemSchema module
const { handleItemSchema } = require('./modules/ItemSchema');
const { createNewItem } = require('./modules/ItemSchema');
const { deleteItem } = require('./modules/ItemSchema');
const { updateItem } = require('./modules/ItemSchema');

// CRUD routes
app.get('/item', handleItemSchema);
app.post('/item', createNewItem);
app.delete('/item/:id', deleteItem);
app.put('/item/:id', updateItem);


// // requiring the UserSchema module
// const { handleUserSchema } = require('./modules/UserSchema');
// const { createNewUser } = require('./modules/UserSchema');
// const { deleteUser } = require('./modules/UserSchema');
// const { updateUser } = require('./modules/UserSchema');

// // CRUD routes
// app.get('/user', handleUserSchema);
// app.post('/user', createNewUser);
// app.delete('/user/:id', deleteUser);
// app.put('/user/:id', updateUser);


app.get('/', (req, res) => {
    res.send('Testing Server Request Recieve')
})


app.listen(PORT, () => console.log(`Server is starting on ${PORT}`))