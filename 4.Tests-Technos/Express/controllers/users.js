const db = require('../models');
const {getToken} = require("../utils");
const User = db.user;
const Op = db.Sequelize.Op;

// Retrieve all users from the database.
exports.findAll = (req, res) => {
		const email = req.query.email;
		const condition = email ? {title: {[Op.like]: `%${email}%`}} : null;

		User.findAll({where: condition})
		    .then(data => { res.send(data); })
		    .catch(err => {
				    res.status(500).send({
						    msg: err.msg || "An error occurred while retrieving users."
				    });
		    });
};

// Find a single user with an id
exports.findOne = (req, res) => {
		const id = req.params.id;

		User.findByPk(id)
		    .then(data => { res.send(data);})
		    .catch(() => {
				    res.status(500).send({
						    msg: "Error retrieving User with id=" + id
				    });
		    });
};

// Find a single user with a token
exports.findByToken = (req, res) => {
		const token = req.body.token;

		// Validate request
		if(!token) {
				res.status(400).send({
						msg: "Token cannot be empty!"
				});
				return;
		}

		User.findOne({
				    where: {
						    token: token
				    }
		    })
		    .then(data => {res.send(data)})
		    .catch(() => {
				    res.status(401).send({
						    msg: "Invalid token"
				    });
		    });
};

// Create and save a new user
exports.create = (req, res) => {

		// Validate request
		if(!req.body.email || !req.body.password) {
				res.status(400).send({
						msg: "Email and password cannot be empty!"
				});
				return;
		}

		// Create a user
		const user = {
				email: req.body.email,
				password: req.body.password,
				token: getToken()
		};

		// Save user in the database
		User.create(user)
		    .then(data => {res.send(data)})
		    .catch(err => {
				    res.status(500).send({
						    msg: err.msg || "An error occurred while creating the user."
				    });
		    });
};

// Update a user by the id in the request
exports.update = (req, res) => {
		const id = req.params.id;

		User.update(req.body, {
				    where: {id: id}
		    })
		    .then(num => {
				    res.send({
						    msg: (num == '1') ? "User was updated successfully!"
								    : `Cannot update user with id=${id} num=${num}. Maybe user was not found or req.body is empty!`
				    });
		    })
		    .catch(() => {
				    res.status(500).send({
						    msg: "Error updating user with id=" + id
				    });
		    });
};

// Delete a user with the specified id in the request
exports.delete = (req, res) => {
		const id = req.params.id;

		User.destroy({
				    where: {id: id}
		    })
		    .then(num => {
				    res.send({
						    msg: (num === 1) ? "User was deleted successfully!"
								    : `Cannot delete user with id=${id}. Maybe user was not found!`
				    });
		    })
		    .catch(() => {
				    res.status(500).send({
						    msg: "Could not delete user with id=" + id
				    });
		    });
};

// Validate an user credentials
exports.validate = (req, res) => {

		// Validate request
		if(!req.body.email || !req.body.password) {
				res.status(400).send({
						msg: "Email and password cannot be empty!"
				});
				return;
		}

		User.findOne({
				    where: {
						    email: req.body.email
				    }
		    })
		    .then(data => {
				    if(data.password === req.body.password) {
						    res.send({"token": data.token});
				    }
				    else {
						    throw "Wrong password";
				    }
		    })
		    .catch(() => {
				    res.status(401).send({
						    msg: "User authentication failed"
				    });
		    });
};
