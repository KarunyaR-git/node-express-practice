
const mongoose = require('mongoose');
const User = require('../models/User');

async function getUsers(req, res) {

    const users = await User.find();

    res.status(200).json(users);

}

async function getUserById(req, res) {
    const id = req.params.id;
    if(mongoose.Types.ObjectId.isValid(id)) {
        //const user = users.find((user)=> user.id === id);
        const user = await User.findById(id);
        if(user) {
            res.status(200).json(user);
        } else {
            res.status(404).send('User not found');
        }
    } else {
        res.status(400).send('Invalid id format');
    }    
}

async function createUser(req, res) {
    const { name, age, role} = req.body;
    
    if(age === undefined || age === null || !name || !role) {
        res.status(400).send('name, age and role are required');
    } else {
        try {
            const user = new User(req.body);
            await user.save();

            res.status(201).json(user);
        } catch (error) {
            if (error.name === 'ValidationError' || error.name === 'CastError') {
                return res.status(400).send('Invalid user data');
            }

            return res.status(500).send('Something went wrong');
        }
    }
}

async function updateUser(req, res) {
    const id = req.params.id;
    const { name, age, role } = req.body || {};
    if(mongoose.Types.ObjectId.isValid(id)) {
        if(!name && (age === undefined || age === null) && !role ) {
            res.status(400).send('Name or age or role is required');
        } else {
            const updatedUser = await User.findByIdAndUpdate(id, req.body);
            console.log(updatedUser);
            if (!updatedUser) {
                return res.status(404).send('User not found');
            }
            return res.status(200).send('Success');
        }        
    } else {
        res.status(400).send('Invalid id format');
    }
}

async function deleteUser(req, res) {
    const id = req.params.id;
    if(mongoose.Types.ObjectId.isValid(id)) {
        const deleteUser = await User.findByIdAndDelete(id);
        console.log(deleteUser);
        if(!deleteUser) {            
            return res.status(404).send('User not found');
        } 
        return res.status(204).end();
        //res.sendStatus(204); // Both will work just for reference adding here.
           
    } else {
        res.status(400).send('Invalid id format');
    }
}

module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
};