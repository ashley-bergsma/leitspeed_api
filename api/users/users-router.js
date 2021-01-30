//? This instantiates the router that we will export below ?(is this the correct wording?)
const router = require('express').Router(); 

//* Imports the connection to the database - can be named whatever 
//! Now that we have a model in the works, we're going to be getting rid of this direct connection
//! Instead the connection will come from a SQLite structure model 
const db = require('../../data/connection'); 

//* THIS IS THE MODEL CONNECTION, ^ we should refactor the end points using the db above to use the model - a SQL intermediary set of functions 
const users = require("./users-model"); 
//* ⬆ this guy is going to be the star going forward 
// In short, we call this to call the database

//TODO [🦄] Delete a user 

//* Get all users 
//* Sanity checked ✅
router.get('/', (req, res) => {
    users.find()
        .then(users => {
            res.status(200).json({ data: users}); 
        })
        .catch(handleError); 
}); 

//* Get user by id {dynamic param}
//* Sanity checked ✅
router.get('/:id', (req, res) => {
    const { id } = req.params; 

    users.findById(id)
        .then(user => {
            res.status(200).json({ data: user }); 
        })
        .catch(handleError); 
});

//* Post a new user 
router.post('/register', (req, res) => {
    //? What things does a user *need* to be added successfully?
    //* name, password, username, email (optional)
    //TODO - create a piece of middleware that checks for name, username and password 
    const { name, username, password, email } = req.body; 

    if (name && username && password) {
        users.add({name, username, password, email})
            .then(user => {
                res.status(201).json({ message: "Registration Successful!", user: user });
            })
            .catch(handleError);
    } else if (!name || !username || !password) {
        res.status(403).json({ message: "Missing or invalid field entries, username and password required!" })
    }
})

/* --------------------------- Note on Middleware --------------------------- */
//* We could use a handleError function to handle errors, perhaps logging them, and pass it to the catch clause. 
//TODO [🦄] Make this more robust, handle saving errors somewhere to see later? How can I do that? 

function handleError(error) {
    res.status(500).json({ message: error.message }); 
}

/* ----------------------- tips for writing end points ---------------------- */
// start the statement in total but empty to start
//* db('users').then().catch() for example - helps keep in mind promise rules

//! Don't forget to export & import into server.js
module.exports = router;
