const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const ArticleSchema = new Schema({
    heading: {
        type: String,
        required: true,
        unique: true
    },
    link: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    comments: [{
        id : {
            ref: 'Comment',
            type: Schema.Types.ObjectId,
        },
        author: {
            type: String
        },
        subject: {
            type: String
        },
        message: {
            type: String
        }
    }]
});

ArticleSchema.plugin(uniqueValidator);

const Article = mongoose.model('Article', ArticleSchema);

module.exports = Article;