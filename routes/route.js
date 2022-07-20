const express = require('express');
const router = express.Router();
const Item = require('../model/itemSchema');
const validateData = require('../validate')

router.get('/items', (req, res) => {
    Item.find({}, function(err, data) {
        if (data.length == 0) return res.send("Nothing Found")
        res.send(data);
    });

});

router.get('/items/:id', (req, res) => {

    Item.find({ id: req.params.id }, (err, data) => {
        if (data.length == 0) return res.status(400).send("NOt found")
        res.send(data);
    })
});


router.post('/items', (req, res) => {
    const { error } = validateData(req.body)
    if (error) {
        return res.status(400).send(error.details[0].message)
    }


    Item.count({}, function(err, result) {
        if (err) {
            console.log(err);
        } else {

            const item = new Item({
                id: result + 1,
                name: req.body.name
            })
            item.save();

            console.log("Item saved " + result);
            res.send(item);
        }
    })

});

router.put('/items/:id', (req, res) => {

    Item.find({ id: req.params.id }, (err, data) => {
        if (data.length == 0) return res.status(400).send("NOt found")
        Item.updateOne({ id: req.params.id }, { $set: { name: req.body.name } }, { upsert: true }, function(err) {
            res.send("Updated");
        })
    })


})

router.delete('/items/:id', (req, res) => {

    Item.find({ id: req.params.id }, (err, data) => {
        if (data.length == 0) return res.status(400).send("NOt found")
        Item.deleteOne({ id: req.params.id }, { upsert: true }, function(err) {
            res.send("deleted");
        })
    })
})

module.exports = router;