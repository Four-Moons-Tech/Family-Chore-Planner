const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');
const choresSchema = require('./Chore')

const childUserSchema = new Schema(
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
        
        chores: [ choresSchema]
          
    },
    {
        toJSON: {
            getters: true,
            virtuals: true,
        },
    }
);

childUserSchema.pre('save', async function (next) {
    if (this.isNew || this.isModified('password')) {
      const saltRounds = 10;
      this.password = await bcrypt.hash(this.password, saltRounds);
    }
  
    next();
  });
  
  childUserSchema.methods.isCorrectPassword = async function (password) {
    return bcrypt.compare(password, this.password);
  };

childUserSchema.virtual('choreCount').get(function () {
    
    return this.chores.length;
});

childUserSchema.virtual('TotalEarnings').get(function(){
    let total = 0
    this.chores.forEach(function(chore){
        if(chore.complete){
            total+=chore.payRate
        }
    })
    return total
})




module.exports = childUserSchema