import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,unique:true,required:true},
    password:{type:String},
    credit:{
        type:Number,
        default:50,
        min:0
    },
    isCreditAvailable:{
        type:Boolean,default:false
    },
    notes:{
        type:[mongoose.Schema.Types.ObjectId],
        ref:"Notes",
        default:[]
    }
},{timestamps:true});

const  User = mongoose.model("User",userSchema);
export default User;