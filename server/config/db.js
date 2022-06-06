const mongoose = require('mongoose');
module.exports = () => {
    return mongoose.connect('mongodb+srv://dkravi93:imravi93@cluster0.9tpjh.mongodb.net/charlie?retryWrites=true&w=majority');
}