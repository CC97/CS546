const mongoCollections = require('../config/mongoCollections');
const restaurants = mongoCollections.restaurants;
let { ObjectId } = require('mongodb');
//const { getAll } = require('./restaurants');

function objectId(id){
    if (!id) throw 'Id parameter must be supplied';
    isString(id);
    let parsedId = ObjectId(id);
    return parsedId;
}

function isString(a){
    if(typeof a != 'string') throw 'it must be a string';
    if (a.length == 0 || a.trim().length == 0) throw 'content is not valid';
}

function dateFormat(a){
    a = a.split('/');
    var myDate = new Date();
    if(a[0] != myDate.getMonth()+1 || a[1] != myDate.getDate() || a[2] != myDate.getFullYear()) throw 'Date is not valid';
}

function getOverallRating(a){
    if(a.length == 0)
    {
        return 0;
    }
    let length = a.length;
    let sum = 0;
    for (let i = 0; i < length; i++)
    {
        sum += a[i]['rating'];
    }
    let result = sum / length;
    return result.toFixed(1);
}

module.exports = {
    async create(restaurantId, title, reviewer, rating, dateOfReview, review){
        if(!restaurantId || !title || !reviewer || !rating || !dateOfReview || !review || arguments.length != 6) throw 'element is not valid!'
        isString(restaurantId);
        isString(title);
        isString(reviewer);
        isString(dateOfReview);
        isString(review);
        if(typeof rating != 'number' || rating < 1 || rating > 5) throw 'rating is not valid!';
        dateFormat(dateOfReview);
        
        let newReview = {
            _id: new ObjectId(),
            title: title,
            reviewer: reviewer,
            rating: rating,
            dateOfReview: dateOfReview,
            review: review
        }
        restaurantId = objectId(restaurantId);
        const restaurantCollection = await restaurants();
        const restaurantResult = await restaurantCollection.findOne({ _id: restaurantId });
        if (restaurantResult === null) throw 'No restaurant with that id';

        restaurantResult['reviews'].push(newReview);
        restaurantResult['overallRating'] = getOverallRating(restaurantResult['reviews']);

        const updatedInfo = await restaurantCollection.updateOne(
            { _id: restaurantId },
            { $set: restaurantResult }
        );
        if (updatedInfo.modifiedCount === 0) {
            throw 'could not update successfully';
        }
        return restaurantResult;
    },
    async getAll(restaurantId){
        if(!restaurantId || arguments.length != 1) throw 'element is not valid!'
        isString(restaurantId);

        restaurantId = objectId(restaurantId);
        const restaurantCollection = await restaurants();
        const restaurantResult = await restaurantCollection.findOne({ _id: restaurantId });
        if (restaurantResult === null) throw 'No restaurant with that id';

        return restaurantResult['reviews'];
    },
    async get(reviewId){
        if (!reviewId || arguments.length != 1) throw 'You must provide an id to search for';
        isString(reviewId);
        var ObjReviewId = objectId(reviewId);
        const restaurantCollection = await restaurants();
        const restaurantResult = await restaurantCollection.findOne({ 'reviews._id': ObjReviewId });
        if (restaurantResult === null) throw 'No review with that id';
        var reviews = restaurantResult['reviews'];
        
        let length = reviews.length;
        for(let i = 0; i < length; i++)
        {
            let id = reviews[i]['_id'].toString();
            if(id === reviewId)
            {
                return reviews[i];
            }     
        }
    },
    async remove(reviewId){
        if (!reviewId || arguments.length != 1) throw 'You must provide an id to search for';
        isString(reviewId);
        var reviewInfo = await this.get(reviewId);
        var ObjReviewId = objectId(reviewId);

        const restaurantCollection = await restaurants();
        const restaurantResult = await restaurantCollection.findOne({ 'reviews._id': ObjReviewId });
        if (restaurantResult === null) throw 'No review with that id';
        var reviews = restaurantResult['reviews'];
        
        let length = reviews.length;
        for(let i = 0; i < length; i++)
        {
            let id = reviews[i]['_id'].toString();
            if(id == reviewId)
            {
                reviews.splice(i,1);
                break;
            }     
        }
        const updatedRestaurant = {
            reviews: reviews,
            overallRating: getOverallRating(reviews)
        }
        
        var restaurantId = restaurantResult['_id'];
        
        const updatedInfo = await restaurantCollection.updateOne(
            { _id: restaurantId },
            { $set: updatedRestaurant }
        );
        if (updatedInfo.modifiedCount === 0) {
            throw 'could not deleted successfully';
        }

        return reviewInfo['title'] + ' has been successfully deleted!';
    }
};