const express = require('express');
const router = express.Router();
const data = require('../data');
const usersData = data.users;

function checkUsername(a){
    if(typeof a != 'string') throw 'Please input username';
    if (a.length == 0 || a.trim().length == 0) throw 'content is not valid';
    if(a.indexOf(' ') != -1) throw 'should not contain spaces';
    var reg = /(?![A-Za-z0-9])./g;
    if (a.search(reg) != -1) throw 'Can not contain any character expect alphanumeric characters';
    if(a.length < 4) throw 'Username at least 4 characters';
}
function checkPassword(a){
    if(typeof a != 'string') throw 'Please input password';
    if (a.length == 0 || a.trim().length == 0) throw 'content is not valid';
    if(a.indexOf(' ') != -1) throw 'should not contain spaces';
    if(a.length < 6) throw 'Password at least 6 characters';
}

router.get('/', async (req, res) => {
    if(req.session.user){
        return res.redirect('/private');
    }
    res.render('signup', {document_title: 'signup'})
});

router.post('/', async (req, res) => {
    try {
        //let userInfo = req.body;
        if (!req.body) throw 'You must provide data to create a user'
        if(!req.body.username) 'You must provide username to create a user'
        if(!req.body.password) 'You must provide password to create a user'
        checkUsername(req.body.username);
        checkPassword(req.body.password);
        const newUser = await usersData.createUser(
            req.body.username,
            req.body.password
        );
        
        if(newUser.userInserted == true)
            res.redirect('/');
        else
            res.status(500).send({message: 'Internal Server Error'})
    } catch (e) {
        res.status(400).render('signup', {document_title: 'signup', status: 'HTTP 400', error: e})
    }

    
});

module.exports = router;