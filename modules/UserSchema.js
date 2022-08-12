const mongoose = require('mongoose');

function handleUserSchema(req, res) {

    UserModel.find({}, (error, data) => {
        if (error) console.log(`error reading from the database: ${error}`);
        else res.send(data);
    });

}

function createNewUser(req, res) {
    const { newUser } = req.body;
    const user = new UserModel(newUser);
    user.save();
    res.status(201).send(user);
}

function deleteUser(req, res) {
    const id = req.params.id;
    UserModel.findByIdAndDelete(id).then(record => {
        res.send(record);
    }).catch(error => {
        res.status(500).send(error.message)
    })
}

function updateUser(req, res) {
    const id = req.params.id;
    const { data } = req.body;
    UserModel.findByIdAndUpdate(id, data).then(record => {
        res.send(record);
    }).catch(error => {
        res.status(500).send(error.message)
    })
}

module.exports = { handleUserSchema, createNewUser, deleteUser, updateUser }

// 1. testing mongoose connection
mongoose.connect(`${process.env.DATABASE_URL}`);

// 2. creating a testing schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        // required: true
    },
    email: {
        type: String,
        // required: true,
        // unique: true
    },
    password: {
        type: String,
        // required: true
    },
    avatar: {
        type: String,
        default: 'https://res.cloudinary.com/unlimatedartt/image/upload/v1654270494/blank-profile-picture-973460_640_yqplrx.png'
    }
}, {
    timestamps: true
})

// 3. create a model for the schema
const UserModel = mongoose.model('UserModel', userSchema);

// creating a test for the schema
const test1 = new UserModel({
    name: 'John Doe',
    email: 'test@gmail.com',
    password: '123456'
});

// saving the test
// test1.save();
