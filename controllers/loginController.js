function login(req, res) {
    const { username, password } = req.body;

    if (!username || !password) {
        //return res.status(400).send('Username and Password required 😭');

        return res.status(400).json({
            success: false,
            message: 'Username and Password required 😭'
        });
    }

    if (username === 'karunya' && password === '1234') {

        //return res.status(200).send('Login Success 😈');  // .send is for text/html

        return res.status(200).json({        // .send is for object/JSON
            success: true,
            message: 'Login Success 😈'
        });

    } 
    
    else {

        //return res.status(401).send('Invalid Credentials 😭');

        return res.status(401).json({
            success: false,
            message: 'Invalid Credentials 😭'
        });

    }
}

module.exports = login;