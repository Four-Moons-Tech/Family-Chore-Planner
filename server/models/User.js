const { Schema, model } = require('mongoose');
const childUserSchema = require('./ChildUser')
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
            required: true
        },
        lastName: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            match: [/.+@.+\..+/, 'Must match an email address!'],
            //Must match a valid email address
        },
    
        children: [ childUserSchema]
        
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
    return this.children.chores.length;
});


const User = model('user', userSchema);

module.exports = User