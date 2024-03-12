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
            default: "Untitled chore"
        },
        payRate: {
            type: Number, 
            required: true,     
            default: 1
        },
        dueDate: {
            type: Date, 
            required: true,
            default: '2000-01-01'
            // get:(date)=>{
            //     return date.toISOString().split("T")[0]
            // }
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





module.exports = {
    choreSchema,
    Chore: model('chore', choreSchema)
}