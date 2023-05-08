const { Schema, model } = require('mongoose');
const{reactionSchema} = require('./Reaction')
const{userSchema} = require('./User')

const thoughtSchema = new Schema(
    {
        thoughtText: {
           type: String,
           require: true,
           minLength: 1,
           maxLength: 280 
        },
        createdAt: {
            type: Date,
            default: Date.now,
            //add getter method here
    
        },
        username: {
            type: String,
            required: true
        },
        reactions: [reactionSchema]
    },
    {
        toJSON: {
            getters: true
        },
        id: false
    }
);


const Thought = model('Thought', thoughtSchema);

module.exports = Thought;