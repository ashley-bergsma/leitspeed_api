const db = require("../../data/connection");

//? What will this model need to let us do?
// FIND cards
// FIND a card by user_id ?
// FIND a card by its ID
// ADD a card
// DELETE a card

module.exports = {
	add,
	find,
	findById,
};

function find() {
	return db("cards");
}

function findById(id) {
	return db("cards").where({ id }).first();
}

function add(card) {
	return db("cards")
		.insert(card, "id")
		.then(([id]) => {
			return findById(id);
		});
}
