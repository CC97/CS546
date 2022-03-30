const mongoCollections = require('../config/mongoCollections');
const restaurants = mongoCollections.restaurants;
let { ObjectId } = require('mongodb');

function isString(a){
    if(typeof a != 'string') throw 'it must be a string';
    if (a.length == 0 || a.trim().length == 0) throw 'content is not valid';
}

function numberFormat(a){
    if((/^(\d{3}-\d{3}-\d{4})$/).test(a) != true || a.length != 12) throw 'phone number is not valid';
    return true;
}

function objectId(id){
    if (!id) throw 'Id parameter must be supplied';
    isString(id);
    let parsedId = ObjectId(id);
    return parsedId;
}

function websiteFormat(a){
    if(a.length < 20)throw 'website is not valid';
    a = a.toLowerCase();
    var start = 'http://www.';
    var end = '.com';
    if(a.substr(0, 11) != start) throw 'website is not valid';
    if(a.substr(a.length - 4, 4) != end) throw 'website is not valid';
    for(let i = 0; i < a.length; i++)
    {
        if(a.charAt(i) === ' ') throw 'website error';
    }
}

function rangFormat(a){
    if (a.length > 4) throw 'price range is not valid';
    for (let i = 0; i < a.length; i++)
    {
        if(a.charAt(i) !== '$') throw 'price range is not valid';
    }
}

function cuisinesFormat(a){
    if(Array.isArray(a) != true) throw 'cuisines is not valid';
    for(let i = 0; i < a.length; i++)
    {
        isString(a[i]);
    }
}

function serviceFormat(a){
    if (!(Object.prototype.toString.call(a) === '[object Object]')) throw 'content is not valid'
    var keys = Object.keys(a);
    var validKey = ['dineIn','takeOut','delivery'];
    if(keys.length != 3) throw 'service option is error';
    for (let i = 0; i < validKey.length; i++)
    {
        if (keys.indexOf(validKey[i]) == -1) throw 'service option error';
    } 
    if(typeof a['dineIn'] != 'boolean' || typeof a['takeOut'] != 'boolean' || typeof a['delivery'] != 'boolean' ) throw 'content is not valid';
}


module.exports = {
    async create(name, location, phoneNumber, website, priceRange, cuisines, overallRating, serviceOptions){
        if(!name || !location || !phoneNumber || !website || !priceRange || !cuisines || !overallRating || !serviceOptions || arguments.length != 8) throw 'All content need to provide!';
        if(typeof overallRating != 'number' || overallRating < 0 || overallRating > 5) throw 'overall rating should be a number (from 0 to 5)'
        isString(name);
        isString(location);
        isString(phoneNumber);
        isString(website);
        isString(priceRange);
        numberFormat(phoneNumber);
        websiteFormat(website);
        rangFormat(priceRange);
        cuisinesFormat(cuisines);
        serviceFormat(serviceOptions);

        let newRestaurant = {
            name: name,
            location: location,
            phoneNumber: phoneNumber,
            website: website,
            priceRange: priceRange,
            cuisines: cuisines,
            overallRating: overallRating,
            serviceOptions: serviceOptions
        }
        const restaurantCollection = await restaurants();
        const insertInfo = await restaurantCollection.insertOne(newRestaurant);
        if (insertInfo.insertedCount === 0) throw 'Could not add restaurant';

        const newId = insertInfo.insertedId;        
        var newIdString = newId.toString();
        const restaurantResult = await this.get(newIdString);

        return restaurantResult;
    },
    async getAll() {
        if(arguments.length != 0) throw 'error';
        const restaurantCollection = await restaurants();
        const restaurantList = await restaurantCollection.find({}).toArray();

        return restaurantList;
      },
    async get(id){
        if (!id || arguments.length != 1) throw 'You must provide an id to search for';
        isString(id);
        id = objectId(id);
        const restaurantCollection = await restaurants();
        const restaurantResult = await restaurantCollection.findOne({ _id: id });
        if (restaurantResult === null) throw 'No restaurant with that id';

        return restaurantResult;
    },
    async remove(id){
        if (!id || arguments.length != 1) throw 'You must provide an id to search for';
        isString(id);
        var restaurantInfo = await this.get(id);
        id = objectId(id);

        const restaurantCollection = await restaurants();
        const deletionInfo = await restaurantCollection.deleteOne({ _id: id });
        
        if (deletionInfo.deletedCount === 0) throw `Could not delete restaurant with id of ${id}`;
        
        return restaurantInfo['name'] + ' has been successfully deleted!';
    },
    async rename (id, newWebsite){
        if (!id || !newWebsite || arguments.length != 2) throw 'You must provide the id and new website';
        isString(id);
        isString(newWebsite);
        websiteFormat(newWebsite);

        var restaurantInfo = await this.get(id);
        if(restaurantInfo['website'] == newWebsite) throw 'website is existed';

        const restaurantCollection = await restaurants();
        const updatedRestaurant = {
            website: newWebsite
        };

        id = objectId(id);
        const updatedInfo = await restaurantCollection.updateOne(
            { _id: id },
            { $set: updatedRestaurant }
        );
        if (updatedInfo.modifiedCount === 0) {
            throw 'could not update successfully';
        }
        id = id.toString();
        return await this.get(id);
    }
};