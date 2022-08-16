const mongoose = require("mongoose");

function handleCartSchema(req, res) {
  CartModel.find({}, (error, data) => {
    if (error) console.log(`error reading from the database: ${error}`);
    else res.send(data);
  });
}

function createNewCart(req, res) {
  const { newCart } = req.body;
  const cart = new CartModel(newCart);
  cart.save();
  res.status(201).send(Cart);
}

function deleteCart(req, res) {
  const id = req.params.id;
  CartModel.findByIdAndDelete(id)
    .then((record) => {
      res.send(record);
    })
    .catch((error) => {
      res.status(500).send(error.message);
    });
}

function updateCart(req, res) {
  const id = req.params.id;
  const { data } = req.body;
  CartModel.findByIdAndUpdate(id, data)
    .then((record) => {
      res.send(record);
    })
    .catch((error) => {
      res.status(500).send(error.message);
    });
}

module.exports = { handleCartSchema, createNewCart, deleteCart, updateCart };

// 1. testing mongoose connection
mongoose.connect(`${process.env.DATABASE_URL}`);

// 2. creating a testing schema
const CartSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      // required: true,
    },
    description: {
      type: String,
      // required: true,
    },
    price: {
      type: Number,
      // required: true,
      default: 0,
    },
    imgURL: {
      type: String,
      // required: true,
    },
    likes: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// 3. create a model for the schema
const CartModel = mongoose.model("CartModel", CartSchema);

// creating a test for the schema
const test1 = new CartModel({
  name: "gallery",
  description: "new test art",
  price: "100000",
  imgURL:
    "https://thumbs.dreamstime.com/b/dollar-sign-white-background-money-gold-symbol-d-illustration-savings-isolated-dollar-sign-white-background-buy-gold-currency-139878542.jpg",
});

// saving the test
// test1.save();
