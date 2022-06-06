const mongoose = require('mongoose');
module.exports = () => {
    return mongoose.connect('mongodb+srv://dkravi93:imravi93@cluster0.lxoxo.mongodb.net/?retryWrites=true&w=majority');
}