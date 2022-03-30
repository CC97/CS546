const mongoCollections = require('../config/mongoCollections');
const users = mongoCollections.users;
let { ObjectId } = require('mongodb');
const bcrypt = require('bcryptjs');
const saltRounds = 16;

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

const createUser = async function createUser(username, password){
    if(!username || !password || arguments.length != 2) throw 'Must provite username and passwor to create the user';
    username = username.toLowerCase();
    checkUsername(username);
    checkPassword(password);
    var hashPassword = await bcrypt.hash(password, saltRounds);

    const userCollection = await users();
    const userResult = await userCollection.findOne({ username: username });
    if (userResult !== null) throw 'the username is existed';
    
    let newUser = {
        username: username,
        password: hashPassword
    }
    
    const insertInfo = await userCollection.insertOne(newUser);
    if (insertInfo.insertedCount === 0) throw 'Fail to add user';

    return {userInserted: true};
}

const checkUser = async function checkUser(username, password){
    if(!username || !password || arguments.length != 2) throw 'Must provite username and passwor to check the user';
    username = username.toLowerCase();
    checkUsername(username);
    checkPassword(password);

    const userCollection = await users();
    const userResult = await userCollection.findOne({ username: username });
    if (userResult === null) throw 'Either the username or password is invalid';

    let compareToMatch = false;
    compareToMatch = await bcrypt.compare(password, userResult.password);
    if(compareToMatch) 
        return {authenticated: true};
    else
        throw 'Either the username or password is invalid';
}

module.exports = {
    createUser,
    checkUser
}