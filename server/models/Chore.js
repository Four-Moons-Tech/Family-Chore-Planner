const { Schema, model, default: mongoose, Types } = require('mongoose');


const choreSchema = new Schema(
    {
        choreId: {
            type: Schema.Types.ObjectId,
            default: ()=> new Types.ObjectId()
        },
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
        userId: {
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





module.exports = choreSchema