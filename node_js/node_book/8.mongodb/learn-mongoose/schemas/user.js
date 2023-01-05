const mongoose = require('mongoose');

const {Schema} = mongoose;

// _id 는 기본으로 mongoose가 생성
const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    age: {
        type: Number,
        required: true,
    },
    married: {
        type: Boolean,
        required: true,
    },
    comment: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
});


module.exports = mongoose.model('User', userSchema);

