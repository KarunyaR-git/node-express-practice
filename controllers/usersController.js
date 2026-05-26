
const users = [
    { id: 1, name: 'Karunya' },
    { id: 2, name: 'Gopi' },
    { id: 3, name: 'Priya' }
];

function getUsers(req, res) {
    res.status(200).json(users);
}

function getUserById(req, res) {
    const id = Number(req.params.id);
    console.log(id);
    if(!isNaN(id)) {
        const user = users.find((user)=> user.id === id);
        if(user) {
            res.status(200).json(user);
        } else {
            res.status(404).send('User not found');
        }
    } else {
        res.status(400).send('Invalid id format');
    }    
}

function createUser(req, res) {
    const { id , name} = req.body;
    console.log(typeof(id))
    if(id === undefined || id === null || !name) {
        res.status(400).send('Id and name are required');
    } else {
        if(!isNaN(Number(id))) {
            const isIdPresent = users.findIndex((user)=> user.id === Number(id));
            if(isIdPresent < 0) {
               users.push({id: Number(id), name});
               res.status(201).send('Success'); 
            } else {
                 res.status(400).send('Id already present');
            }
            
        } else {
            res.status(400).send('Invalid id format');
        }
    }
}

function updateUser(req, res) {
    const id = Number(req.params.id);
    const { name } = req.body || {};
    if(!isNaN(id)) {
        if(!name) {
            res.status(400).send('Name required');
        } else {
            const isIdPresent = users.findIndex((user)=> user.id === id);
            if(isIdPresent < 0) {
               res.status(404).send('User not found');
            } else {
                users[isIdPresent].name = name;
                res.status(200).send('Success');
            }
        }        
    } else {
        res.status(400).send('Invalid id format');
    }
}

function deleteUser(req, res) {
    const id = Number(req.params.id);
    if(!isNaN(id)) {
        const isIdPresent = users.findIndex((user)=> user.id === id);
        if(isIdPresent < 0) {
            res.status(404).send('User not found');
        } else {
            users.splice(isIdPresent, 1);
            console.log(users);
            res.status(204).end();
            //res.sendStatus(204); // Both will work just for reference adding here.
        }   
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