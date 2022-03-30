const restaurants = require("./data/restaurants");
const connection = require('./config/mongoConnection');

async function main(){
    //create first restaurant and log it
    const restaurant1 = await restaurants.create(
        "The Saffron Lounge", 
        "New York City, New York", 
        "123-456-7890", 
        "http://www.saffronlounge.com", 
        "$$$$", 
        ["Cuban", "Italian"], 
        3, 
        {dineIn: true, takeOut: true, delivery: false});
    console.log(restaurant1);
        //create second restaurant
    const restaurant2 = await restaurants.create(
        "Shelf Tan", 
        "Jersey City, NJ", 
        "123-456-1234", 
        "http://www.ShelfTan.com", 
        "$$$", 
        ["Cuban", "Chinese"], 
        4, 
        {dineIn: true, takeOut: true, delivery: true});
    //query all restaurants and log them
    const allRestaurant = await restaurants.getAll();
    console.log(allRestaurant);
    //create third restaurant and log it
    const restaurant3 = await restaurants.create(
        "Burger King", 
        "New York City, New York", 
        "123-456-7890", 
        "http://www.burgerking.com", 
        "$$$$", 
        ["burger", "sandwich"], 
        3, 
        {dineIn: true, takeOut: true, delivery: true});
    console.log(restaurant3);
    //rename the first restaurant website and log it
    var getId1 = restaurant1['_id'].toString();
    var updatedRestaurant = await restaurants.rename(getId1, 'http://www.afterchange.com');
    console.log(updatedRestaurant);
    //remove the second restaurant
    var getId2 = restaurant2['_id'].toString();
    var removeRestaurant = await restaurants.remove(getId2);
    console.log(removeRestaurant);

    //create restaurant with bad import
    try {
        const createWrong = await restaurants.create(
            "   ", 
            "New York City, New York", 
            "123-456-7890", 
            "saffronlounge.com", 
            "$$$$", 
            ["Cuban", "Italian"], 
            3, 
            {dineIn: true, takeOut: true, delivery: false});
        console.log(createWrong);
    } catch (error) {
        console.log(error);
    }

    //remove a restaurant that does not exit
    try {
        const removeWong = await restaurants.remove('615f123f398e640b0c0d3b99');
        console.log(removeWong);
    } catch (error) {
        console.log(error);
    }

    //rename a restaurant that does not exist
    try {
        const renameWong = await restaurants.rename('615f123f398e640b0c0d3b99', 'http://www.12345678.com');
        console.log(renameWong)
    } catch (error) {
        console.log(error);
    }

    //rename a restaurant passing in invalid data
    try {
        const alist = await restaurants.getAll();
        var aId = alist[0]['_id'].toString();
        const renameWongWeb = await restaurants.rename(aId, 'google.com');
        console.log(renameWongWeb);
    } catch (error) {
        console.log(error);
    }

    //getting a restaurant by ID that does not exist
    try {
        const getWong = await restaurants.get('615f123f398e640b0c0d3b99');
        console.log(getWong);
    } catch (error) {
        console.log(error);
    }
}


main().catch((error) => {
    console.log(error);
  });
