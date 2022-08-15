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
const { handleUserSchema } = require('./modules/UserSchema');
const { createNewUser } = require('./modules/UserSchema');
const { deleteUser } = require('./modules/UserSchema');
const { updateUser } = require('./modules/UserSchema');

// // CRUD routes
app.get('/user', handleUserSchema);
app.post('/user', createNewUser);
app.delete('/user/:id', deleteUser);
app.put('/user/:id', updateUser);


app.get('/', (req, res) => {
    res.send('Testing Server Request Recieve')
})





// added for login register 
mongoose.connect(`${process.env.DATABASE_URL}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, () => {
    console.log("DB connected")
})

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
})

const User = new mongoose.model("User", userSchema)

//Routes
app.post("/login", (req, res)=> {
    const { email, password} = req.body
    User.findOne({ email: email}, (err, user) => {
        if(user){
            if(password === user.password ) {
                res.send({message: "Login Successfull", user: user})
            } else {
                res.send({ message: "Password didn't match"})
            }
        } else {
            res.send({message: "User not registered"})
        }
    })
}) 

app.post("/register", (req, res)=> {
    const { name, email, password} = req.body
    User.findOne({email: email}, (err, user) => {
        if(user){
            res.send({message: "User already registerd"})
        } else {
            const user = new User({
                name,
                email,
                password
            })
            user.save(err => {
                if(err) {
                    res.send(err)
                } else {
                    res.send( { message: "Successfully Registered, Please login now." })
                }
            })
        }
    })

})



app.get('/login', getAdminData);

function getAdminData(req, res) {
    User.find({}, (error, data) => {
      if (error) console.log(`error reading from the database: ${error}`);
      else res.send(data);
    });
  }


app.listen(PORT, () => console.log(`Server is starting on ${PORT}`))