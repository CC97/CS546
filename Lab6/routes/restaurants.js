const express = require('express');
const router = express.Router();
const data = require('../data');
const restaurantsData = data.restaurants;

function isId(a){
    if((/^[0-9a-fA-F]{24}$/.test(a)) != true) throw 'objectId is not valid';
}

function isString(a){
    if(typeof a != 'string') throw 'it must be a string';
    if (a.length == 0 || a.trim().length == 0) throw 'content is not valid';
}

function numberFormat(a){
    if((/^(\d{3}-\d{3}-\d{4})$/).test(a) != true || a.length != 12) throw 'phone number is not valid';
    return true;
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
    if(a.length == 0) throw 'cuisines is not valid'
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

router.get('/', async (req, res) => {
    try {
        const restaurantsList = await restaurantsData.getRestaurants();
        res.json(restaurantsList);
    } catch (e){
        res.status(500).send();
    }
});

router.post('/', async (req, res) => {
    let restaurantInfo = req.body;
  
    if (!restaurantInfo) {
        res.status(400).json({ error: 'You must provide data to create a user' });
        return;
    }
    if (!restaurantInfo.name) {
        res.status(400).json({ error: 'You must provide a name' });
        return;
    }
    if (!restaurantInfo.location) {
        res.status(400).json({ error: 'You must provide a location' });
        return;
    }
    if (!restaurantInfo.phoneNumber) {
        res.status(400).json({ error: 'You must provide a phoneNumber' });
        return;
    }
    if (!restaurantInfo.website) {
        res.status(400).json({ error: 'You must provide a website' });
        return;
    }
    if (!restaurantInfo.priceRange) {
        res.status(400).json({ error: 'You must provide a priceRange' });
        return;
    }
    if (!restaurantInfo.cuisines) {
        res.status(400).json({ error: 'You must provide a cuisines' });
        return;
    }
    if (!restaurantInfo.serviceOptions) {
        res.status(400).json({ error: 'You must provide a serviceOptions' });
        return;
    }

  
    try {
        isString(restaurantInfo.name);
        isString(restaurantInfo.location);
        isString(restaurantInfo.phoneNumber);
        isString(restaurantInfo.website);
        isString(restaurantInfo.priceRange);
        numberFormat(restaurantInfo.phoneNumber);
        websiteFormat(restaurantInfo.website);
        rangFormat(restaurantInfo.priceRange);
        console.log(restaurantInfo.cuisines)
        cuisinesFormat(restaurantInfo.cuisines);
        serviceFormat(restaurantInfo.serviceOptions);
        const newRestaurant = await restaurantsData.create(
            restaurantInfo.name,
            restaurantInfo.location,
            restaurantInfo.phoneNumber,
            restaurantInfo.website,
            restaurantInfo.priceRange,
            restaurantInfo.cuisines,
            restaurantInfo.serviceOptions
      );
        res.json(newRestaurant);
    } catch (e) {
        res.status(400).json({message:e});
    }
  });

router.get('/:id', async (req, res) => {
    try {
        isString(req.params.id);
        isId(req.params.id)
        const restaurant = await restaurantsData.get(req.params.id);
        res.json(restaurant);
    } catch (e) {
        res.status(404).json({ message: e });
    }
});

router.put('/:id', async (req, res) => {
    if (!req.params.id) {
        res.status(404).json({ error: 'You must provide a restaurantId' });
        return;
    }
    let restaurantInfo = req.body;
    if (!restaurantInfo) {
        res.status(400).json({ error: 'You must provide data to create a restaurant' });
        return;
    }
    if (!restaurantInfo.name) {
        res.status(400).json({ error: 'You must provide a name' });
        return;
    }
    if (!restaurantInfo.location) {
        res.status(400).json({ error: 'You must provide a location' });
        return;
    }
    if (!restaurantInfo.phoneNumber) {
        res.status(400).json({ error: 'You must provide a phoneNumber' });
        return;
    }
    if (!restaurantInfo.website) {
        res.status(400).json({ error: 'You must provide a website' });
        return;
    }
    if (!restaurantInfo.priceRange) {
        res.status(400).json({ error: 'You must provide a priceRange' });
        return;
    }
    if (!restaurantInfo.cuisines) {
        res.status(400).json({ error: 'You must provide a cuisines' });
        return;
    }
    if (!restaurantInfo.serviceOptions) {
        res.status(400).json({ error: 'You must provide a serviceOptions' });
        return;
    }

    try {
        isId(req.params.id);
        isString(restaurantInfo.name);
        isString(restaurantInfo.location);
        isString(restaurantInfo.phoneNumber);
        isString(restaurantInfo.website);
        isString(restaurantInfo.priceRange);
        numberFormat(restaurantInfo.phoneNumber);
        websiteFormat(restaurantInfo.website);
        rangFormat(restaurantInfo.priceRange);
        cuisinesFormat(restaurantInfo.cuisines);
        serviceFormat(restaurantInfo.serviceOptions);
    } catch (e) {
        res.status(400).json({ error: e });
        return;
    }

    try {
        var restaurantDetail = await restaurantsData.get(req.params.id);
        if(
            restaurantDetail.name == restaurantInfo.name &&
            restaurantDetail.location == restaurantInfo.location &&
            restaurantDetail.phoneNumber == restaurantInfo.phoneNumber &&
            restaurantDetail.website == restaurantInfo.website &&
            restaurantDetail.priceRange == restaurantInfo.priceRange &&
            restaurantDetail.cuisines.toString() == restaurantInfo.cuisines.toString() &&
            restaurantDetail.serviceOptions.toString() == restaurantInfo.serviceOptions.toString()
        ) {
            res.status(400).json({ error: 'You must provide different detail' });
        return;
        }
    } catch (e) {
        res.status(404).json({ error: 'No restaurant with that ID' });
        return;
    }
    
    try {
        const updatedRestaurant = await restaurantsData.update(
            req.params.id, 
            restaurantInfo.name,
            restaurantInfo.location,
            restaurantInfo.phoneNumber,
            restaurantInfo.website,
            restaurantInfo.priceRange,
            restaurantInfo.cuisines,
            restaurantInfo.serviceOptions
        );
        res.json(updatedRestaurant);
    } catch (e) {
        res.status(400).json({message:e});
    }
});

router.delete('/:id', async (req, res) => {
    if (!req.params.id) {
        res.status(404).json({ error: 'You must provide a restaurantId' });
        return;
    }
    try {
        isId(req.params.id);
        await restaurantsData.get(req.params.id);
    } catch (e) {
        res.status(404).json({ error: e });
        return;
    }
  
    try {
      await restaurantsData.remove(req.params.id);
      res.status(200).json({'restaurantId': req.params.id, 'deleted':true});
    } catch (e) {
      res.status(400).json({message:e});
    }
});

module.exports = router;