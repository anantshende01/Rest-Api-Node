const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/storeItem', () => {
    console.log("db connected");
});

const itemSchema = new mongoose.Schema({

    id: {
        type: Number
    },

    name: {
        type: String,
        min: 3,
        required: true,
        unique: true
    }
})

module.exports = mongoose.model('item', itemSchema)