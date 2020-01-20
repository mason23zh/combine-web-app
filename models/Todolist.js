const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const TodolistSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    details: {
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

mongoose.model('todolist', TodolistSchema);