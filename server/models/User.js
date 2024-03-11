const { Schema, model } = require('mongoose');
const choreSchema = require('./Chore');

const bcrypt = require('bcrypt');


const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        password: {
            type: String,
            required: true,
            minlength: 8,
        },
        lastName: {
            type: String,
            // required: true,
        },
        email: {
            type: String,
            // unique: true,
            match: [/.+@.+\..+/, 'Must match an email address!'],
        },
        role: {
            type: String,
            // required: true,
            default: "Parent",
        },
        profileImage:{
            type: String
        },

        children: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User',
            },
        ],

        chores: [choreSchema]

    },
    {
        toJSON: {
            getters: true,
            virtuals: true,
        },
    }
);

userSchema.pre('save', async function (next) {
    if (this.isNew || this.isModified('password')) {
        const saltRounds = 10;
        this.password = await bcrypt.hash(this.password, saltRounds);
    }

    next();
});

userSchema.methods.isCorrectPassword = async function (password) {
    return bcrypt.compare(password, this.password);
};

userSchema.virtual('childrenCount').get(function () {
    return this.children.length;
});

userSchema.virtual('choreCount').get(function () {
    return this.chores.length;
});

userSchema.virtual('totalEarnings').get(function () {

    return this.chores.reduce(function (total, chore) {
        if (chore.complete) {
            total += chore.payRate
        }
        return total
    }, 0)

})

const User = model('user', userSchema);

module.exports = User;
