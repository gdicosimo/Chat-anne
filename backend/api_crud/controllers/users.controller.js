import { searchDB, deleteDB, insertDB, updateDB } from '../db/mongo.js';

// Constants
const MODEL='users'

export const getAllUsers = (req, res) => {
    searchDB(MODEL)
    .then((element) => {
        res.json(element)
    })
    .catch((error) => {
        res.status(500).json({status:"error", error: error});
    })
};

export const createUser = (req, res) => {
    searchDB(MODEL, { username : req.body.username})
    .then((element) => {
        if (element.length > 0) {
            res.status(400).send({status: "error", message: req.body.username + " is already exist"})        
        } else {
            insertDB(MODEL, req.body)
            .then( (element) => {
                res.status(201).json({ message: "New user created!", data: element})
            })
            .catch ( (error) => {
                res.status(400).json({status:"error", error: error});
            })
        }
    })
    .catch((error) => {
        res.status(400).json({status:"error", error: error});
    })
};

export const getUserById = (req, res) => {
    searchDB(MODEL, { username: req.params.id })
    .then((element) => {
        res.json(element)
    })
    .catch((error) => {
        res.status(500).json({status:"error", error: error});
    })
};

export const updateUser = (req, res) => {
    updateDB(MODEL, { username: req.params.id }, req.body)
    .then((element) =>
     {
        res.status(201).json({ message: "has been successfully update!", data: element})
    })
    .catch((error) => {
        res.status(400).json({status:"error", message: req.params.id + " does not exist"});
    })
};


export const deleteUser = (req, res) => {

    // Tengo en cuenta que el username es el id
    const username = req.params.id || '';

    searchDB(MODEL, { username: username})
    .then((element) => {
        if (Object.keys(element).length > 0) {
            deleteDB(MODEL, {username: username})
            .then((element) => {
                res.status(201).json({ message: `${username} has been successfully deleted!`, data: element})
            })
            .catch ((error) => {
                res.status(400).json({status:"error", error: error});
            })
        } else {
            res.status(400).send({
                status: "error",
                message: username + " does not exist"
            })    
        }
    })
    .catch((error) => {
        res.status(500).json({status:"error", error: error});
    })
};
