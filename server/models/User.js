const { Schema, model } = require('mongoose');
const choresSchema = require('./Chores')

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            //unique: true,
            trim: true
        },
        lastName: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            //Must match a valid email address
        },
        role: {
            type: Selection,
            required: true,
        },
        children: [
            {
                type: Schema.Types.ObjectId,
                ref: "User",
                // child_id: 
                chores: [
                    {
                        type: Schema.Types.ObjectId,
                        ref: "Chores",
                    }
                ],
            }
        ]
    },
    {
        toJSON: {
            getters: true,
            virtuals: true,
        },
    }
);

userSchema.virtual('childrenCount').get(function () {
    return this.children.length;
});

userSchema.virtual('ChoreCount').get(function () {
    return this.children.chores.length;
});


const User = model('user', userSchema);

module.exports = User