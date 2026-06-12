const express = require('express');
const router = express.Router();

const allowRoles = require('../middleware/allowRoles');

const { getUsers,  getUserById, createUser, updateUser, deleteUser} = require('../controllers/usersController');

router.get('/', allowRoles(['admin']), getUsers);

router.get('/:id',allowRoles(['user', 'admin']), getUserById);

router.post('/', allowRoles(['user']), createUser);

router.put('/:id', allowRoles(['user', 'admin']), updateUser);

router.delete('/:id', allowRoles(['admin']), deleteUser);

module.exports = router;