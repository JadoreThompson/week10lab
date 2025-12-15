const mongoose = require("mongoose");

// Define the Book schema
const BookScheme = mongoose.Schema({
  booktitle: {
    type: String,
    required: true,
  },
  PubYear: {
    type: Number,
  },
  author: {
    type: String,
  },
  Topic: {
    type: String,
  },
  formate: {
    type: String,
  },
});

// Export the model
module.exports = mongoose.model("bookmodel", BookScheme, "BookCollection2");
