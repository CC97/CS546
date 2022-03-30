const express = require('express');
const router = express.Router();
const data = require('../data');
const usersData = data.users;

function checkUsername(a){
    if(typeof a != 'string') throw 'it must be a string';
    if (a.length == 0 || a.trim().length == 0) throw 'content is not valid';
    if(a.indexOf(' ') != -1) throw 'should not contain spaces';
    var reg = /(?![A-Za-z0-9])./g;
    if (a.search(reg) != -1) throw 'Can not contain any character expect alphanumeric characters';
    if(a.length < 4) throw 'Username at least 4 characters';
}
function checkPassword(a){
    if(typeof a != 'string') throw 'it must be a string';
    if (a.length == 0 || a.trim().length == 0) throw 'content is not valid';
    if(a.indexOf(' ') != -1) throw 'should not contain spaces';
    if(a.length < 6) throw 'Password at least 6 characters';
}

router.post('/', async (req, res) => {
    try {
        if (!req.body) throw 'You must provide data to create a user'
        if(!req.body.username) throw 'You must provide username to create a user' 
        if(!req.body.password) throw 'You must provide password to create a user'
        req.body.username = req.body.username.toLowerCase();
        checkUsername(req.body.username);
        checkPassword(req.body.password);
        const newUser = await usersData.checkUser(
            req.body.username,
            req.body.password
        );
        if(newUser.authenticated == true)
        {
            req.session.user = { username: req.body.username};
            res.redirect('/private');
        }
    } catch (e) {
        res.status(400).render('login', {document_title: 'login', status: 'HTTP 400', error: e})
    }

    
});

module.exports = router;