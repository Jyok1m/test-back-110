var express = require("express");
var router = express.Router();

let friends = ["Pierre", "Paul", "Jacques"];

// 1. Création de la route GET "/test"
router.get("/test", function (req, res) {
	console.log("Friends : ", friends);
	return res.json({ message: "Hello World !", friends: friends[0] }); // Renvoi de la réponse { message: "Hello World" } au front-end / thunder client
});

// 2. Création de la route GET "/test"
router.post("/test/:cityName", function (req, res) {
	const newFriend = req.body.newFriend;
	const favorite = req.body.favoriteFood;
	const car = req.params.cityName;

	console.log("newFriend", newFriend);
	console.log("favorite", favorite);
	console.log("car", car);

	friends.push(newFriend);
	return res.json({ message: "Update Complete !", brandNewCar: car }); // Renvoi de la réponse { message: "Hello World" } au front-end / thunder client
});

module.exports = router;
