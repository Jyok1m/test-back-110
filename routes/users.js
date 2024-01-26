var express = require("express");
var router = express.Router();

const Friend = require("../models/friends");
const User = require("../models/users");

router.post("/friends/new", (req, res) => {
	// 1. Récupérer les valeurs du corps de notre requête (BODY)

	// Mode classic !
	const firstname = req.body.firstname;
	const lastname = req.body.lastname;

	// Mode destructuré
	const { age, street, zipcode, isFavorite } = req.body;

	// 2. Créer l'utilsateur
	const newFriend = new Friend({
		firstname: firstname, // Classic
		lastname: lastname, // Classic
		age: parseInt(age),
		addresses: [
			{
				street,
				zipcode: parseInt(zipcode),
				isFavorite: Boolean(isFavorite),
			},
		],
		createdAt: new Date(),
	});

	// 3. Sauvegarder l'utilsateur
	newFriend
		.save()
		.then(() =>
			Friend.find()
				.then((data) => {
					return res.json({ friendList: data });
				})
				.catch((err) => console.error(err))
		)
		.catch((err) => console.error(err));
});

router.get("/friends/:userId", (req, res) => {
	const userId = req.params.userId;

	Friend.findById(userId)
		.then((data) => {
			return res.json({ userDetails: data });
		})
		.catch((e) => console.error(e));
});

router.put("/friends/:userId", (req, res) => {
	const userId = req.params.userId;
	const { street, zipcode, isFavorite } = req.body;

	const addressToAdd = {
		street,
		zipcode: parseInt(zipcode),
		isFavorite: Boolean(isFavorite),
	};

	Friend.updateOne({ _id: userId }, { $push: { addresses: addressToAdd } })
		.then(() => {
			Friend.findById(userId)
				.then((data) => {
					return res.json({ userDetails: data });
				})
				.catch((e) => console.error(e));
		})
		.catch((e) => console.error(e));
});

router.post("/signup", (req, res) => {
	const { firstname, lastname, email } = req.body;

	if (!firstname || !lastname || !email) {
		return res.json({ success: false, error: "Champs manquant !" });
	}

	User.findOne({ email })
		.then((userFound) => {
			if (userFound) {
				return res.json({ success: false, error: "Utilisateur déjà existant !" });
			} else {
				const newUser = new User({ firstname, lastname, email });
				newUser.save().then((userCreated) => {
					return res.json({ success: true, message: "Utilisateur créé !", userDetails: userCreated });
				});
			}
		})
		.catch((e) => console.error(e));
});

router.post("/signin", (req, res) => {
	const { email } = req.body;

	if (!email) {
		return res.json({ success: false, error: "Champs manquant !" });
	}

	User.findOne({ email })
		.then((userFound) => {
			if (userFound) {
				return res.json({ success: true, user: userFound });
			} else {
				return res.json({ success: false, message: "Utilisateur non trouvé !" });
			}
		})
		.catch((e) => console.error(e));
});

module.exports = router;
