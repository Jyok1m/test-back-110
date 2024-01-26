const mongoose = require("mongoose");

const addressSchema = mongoose.Schema({
	street: String,
	zipcode: Number,
	isFavorite: Boolean,
});

const friendSchema = mongoose.Schema({
	firstname: String,
	lastname: String,
	age: Number,
	addresses: [addressSchema],
	createdAt: Date,
});

const Friend = mongoose.model("friends", friendSchema);

module.exports = Friend;
