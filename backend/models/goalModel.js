const mongoose = require('mongoose')

const goalSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    text: {
        type: String,
        required: [true, 'Please add a text value']
    },
    site: {
        type: String
    },
    date: {
        type: Date
    },
    description: {
        type: String
    }
    }, {
        //will create createdat updatedat
        timestamps: true
    }
)

module.exports = mongoose.model('Goal', goalSchema)