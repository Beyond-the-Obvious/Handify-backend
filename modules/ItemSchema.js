const mongoose = require("mongoose");

function handleItemSchema(req, res) {
  ItemModel.find({}, (error, data) => {
    if (error) console.log(`error reading from the database: ${error}`);
    else res.send(data);
  });
}

function createNewItem(req, res) {
  const { newItem } = req.body;
  const item = new ItemModel(newItem);
  item.save();
  res.status(201).send(item);
}

function deleteItem(req, res) {
  const id = req.params.id;
  ItemModel.findByIdAndDelete(id)
    .then((record) => {
      res.send(record);
    })
    .catch((error) => {
      res.status(500).send(error.message);
    });
}

function updateItem(req, res) {
  const id = req.params.id;
  const { data } = req.body;
  ItemModel.findByIdAndUpdate(id, data)
    .then((record) => {
      res.send(record);
    })
    .catch((error) => {
      res.status(500).send(error.message);
    });
}

module.exports = { handleItemSchema, createNewItem, deleteItem, updateItem };

// 1. testing mongoose connection
mongoose.connect(`${process.env.DATABASE_URL}`);

// 2. creating a testing schema
const itemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      default: 0,
    },
    imgURL: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// 3. create a model for the schema
const ItemModel = mongoose.model("ItemModel", itemSchema);

// creating a test for the schema
const test1 = new ItemModel({
  name: "gallery",
  description: "new test art",
  price: "100000",
  imgURL:
    "https://thumbs.dreamstime.com/b/dollar-sign-white-background-money-gold-symbol-d-illustration-savings-isolated-dollar-sign-white-background-buy-gold-currency-139878542.jpg",
});

// saving the test
// test1.save();
