const { Schema, model, default: mongoose, Types } = require('mongoose');


const choresSchema = new Schema(
    {
        description: {
            type: String,
            required: true,
            maxlength: 280,
            minlength: 1,
        },
        payRate: {
            type: Number, 
            required: true,     
        },
        dueDate: {
            type: Date, 
            required: true,
            get:(date)=>{
                return date.toISOString().split("T")[0]
            }
        },     
        complete: {
            type: Boolean,
            default: false

        },    
        child_id: {
            type: String,
            required: true,
        },
    },
    {   
        timestamps: true,
        toJSON: {
            virtuals: true,
            getters: true
        },
        
    }
);




const Chores = model('Chores', choresSchema);
module.exports = Chores