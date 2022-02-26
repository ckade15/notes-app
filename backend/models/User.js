const mongoose = require('mongoose');

const User = new mongoose.model(
    "User",
    new mongoose.Schema({
        firstName: {
            type: String,
            trim: true
        },
        lastName: {
            type: String,
            trim: true
        },
        email: {
            type: String,
            unique: true,
        },
        password: {
            type: String,
        },
        confirmationCode: {
            type: String,
            required: [true, 'Confirmation code is required']
        },
        isConfirmed: {
            type: Boolean,
            default: false
        },
        createdAt: {
            type: Date,
            default: Date.now
        },
        notes: [
            {
                title: {
                    type: String,
                    trim: true
                },
                content: {
                    type: String,
                    trim: true
                }
            }
        ],
        sessionToken: {
            type: String,
            default: ''
        }
    })

);


module.exports = User;