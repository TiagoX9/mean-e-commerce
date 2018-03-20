const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: String,
    email: { type: String, unique: true, lowercase: true },
    password: String,
    photo: String,
    isSeller: { type: Boolean, default: false },
    address: {
        adrs1: String,
        adrs2: String,
        street: String,
        city: String,
        state?: String,
        country: String,
        postalCode: String
    },
    created: { type: Date, default: Date.now()  }
})