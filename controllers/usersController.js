
const mongoose = require('mongoose');
const User = require('../models/User');

async function getUsers(req, res) {

    const users = await User.find();

    res.status(200).json(users);

}

async function getUserById(req, res, next) {
    const id = req.params.id;
    if(mongoose.Types.ObjectId.isValid(id)) {
        //const user = users.find((user)=> user.id === id);
        const user = await User.findById(id);
        if(user) {
            res.status(200).json(user);
        } else {
            const error = new Error('User not found');
            error.statusCode = 404;
            return next(error);
        }
    } else {
        return res.status(400).send('Invalid id format');
    }    
}

async function createUser(req, res, next) {
    try {
            const user = new User(req.body);
            await user.save();

            res.status(201).json(user);
        } catch (error) {
            return next(error);
        }
}

async function updateUser(req, res, next) {
    const id = req.params.id;
    const { name, age, role } = req.body || {};
    if(mongoose.Types.ObjectId.isValid(id)) {
        if(!name && (age === undefined || age === null) && !role ) {
            return res.status(400).send('Name or age or role is required');
        } 
        try {
                const updatedUser = await User.findByIdAndUpdate(id, req.body, {
                new: true,
                runValidators: true
                });
                if (!updatedUser) {
                    const error = new Error('User not found');
                    error.statusCode = 404;
                    return next(error);                    
                }
                return res.status(200).send('Success');
            } catch(error) {
                next(error);
            }   
    } else {
        return res.status(400).send('Invalid id format');
    }
}

async function deleteUser(req, res, next) {
    const id = req.params.id;
    if(mongoose.Types.ObjectId.isValid(id)) {
        const deleteUser = await User.findByIdAndDelete(id);
        console.log(deleteUser);
        if(!deleteUser) {            
            const error = new Error('User not found');
            error.statusCode = 404;
            return next(error);
        } 
        return res.status(204).end();
        //res.sendStatus(204); // Both will work just for reference adding here.
           
    } else {
        return res.status(400).send('Invalid id format');
    }
}

module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
};