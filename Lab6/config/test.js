const mongoCollections = require('./mongoCollections');

const dogs = mongoCollections.dogs;

async function getDogById(id) {

if (!id) throw 'You must provide an id to search for';

const dogCollection = await dogs();

const doggo = dogCollection.findOne({ _id: id });

if (doggo === null) throw 'No dog with that id';

return doggo;

 }