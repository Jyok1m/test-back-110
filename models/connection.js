const mongoose = require("mongoose");

const url = process.env.MONGODB_URL;

mongoose
	.connect(url, { connectTimeoutMS: 2000 })
	.then(() => console.log("Database connected !"))
	.catch((err) => console.error(err));
