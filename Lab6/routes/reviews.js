const express = require('express');
const router = express.Router();
const data = require('../data');
const reviewsData = data.reviews;

function isString(a){
    if(typeof a != 'string') throw 'it must be a string';
    if (a.length == 0 || a.trim().length == 0) throw 'content is not valid';
}

function isId(a){
    if((/^[0-9a-fA-F]{24}$/.test(a)) != true) throw 'objectId is not valid';
}

function dateFormat(a){
    a = a.split('/');
    var myDate = new Date();
    if(a[0] != myDate.getMonth()+1 || a[1] != myDate.getDate() || a[2] != myDate.getFullYear()) throw 'Date is not valid';
}

router.get('/:id', async (req, res) => {
    if (!req.params.id) {
        res.status(404).json({ error: 'You must provide a restaurantId' });
        return;
    }
    try {
        isString(req.params.id);
        isId(req.params.id);
        const review = await reviewsData.getAll(req.params.id);
        if(review.length == 0){
            res.status(404).json({ error: 'No review for this restaurant' });
            return;
        }
        res.json(review);
    } catch (e) {
        res.status(404).json({ message: e });
    }
});

router.post('/:id', async (req, res) => {
    if (!req.params.id) {
        res.status(404).json({ error: 'You must provide a restaurantId' });
        return;
    }
    let reviewInfo = req.body;
  
    if (!reviewInfo) {
        res.status(400).json({ error: 'You must provide data to create a review' });
        return;
    }
    if (!reviewInfo.title) {
        res.status(400).json({ error: 'You must provide a title' });
        return;
    }
    if (!reviewInfo.reviewer) {
        res.status(400).json({ error: 'You must provide a reviewer' });
        return;
    }
    if (!reviewInfo.rating) {
        res.status(400).json({ error: 'You must provide a rating' });
        return;
    }
    if (!reviewInfo.dateOfReview) {
        res.status(400).json({ error: 'You must provide a date' });
        return;
    }
    if (!reviewInfo.review) {
        res.status(400).json({ error: 'You must provide a review' });
        return;
    }

    try {
        isString(req.params.id);
        isId(req.params.id);
        isString(reviewInfo.title);
        isString(reviewInfo.reviewer);
        isString(reviewInfo.dateOfReview);
        isString(reviewInfo.review);
        console.log()
        if(typeof reviewInfo.rating != 'number' || reviewInfo.rating < 1 || reviewInfo.rating > 5) throw 'rating is not valid!';
        dateFormat(reviewInfo.dateOfReview);
        const newReview = await reviewsData.create(
            req.params.id,
            reviewInfo.title,
            reviewInfo.reviewer,
            reviewInfo.rating,
            reviewInfo.dateOfReview,
            reviewInfo.review
      );
        res.json(newReview);
    } catch (e) {
        res.status(400).json({message:e});
    }
});

router.get('/review/:id', async (req, res) => {
    if (!req.params.id) {
        res.status(404).json({ error: 'You must provide a reviewId' });
        return;
    }
    try {
        isString(req.params.id);
        isId(req.params.id);
        const review = await reviewsData.get(req.params.id);
        res.json(review);
    } catch (e) {
        res.status(404).json({ message: e });
    }
});

router.delete('/:id', async (req, res) => {
    if (!req.params.id) {
        res.status(404).json({ error: 'You must provide a reviewId' });
        return;
    }
  
    try {
        isString(req.params.id);
        isId(req.params.id);
        await reviewsData.remove(req.params.id);
        res.status(200).json({'reviewId': req.params.id, 'deleted':true});
    } catch (e) {
        res.status(400).json({message:e});
    }
});

module.exports = router;