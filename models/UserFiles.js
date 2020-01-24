const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserFilesScheam = new Schema({
    fileName: {
        type: String,
        required: true
    },
    user: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        require: true
    }

});

mongoose.model('userFiles', UserFilesScheam);