const mongoose=require('mongoose');
const contactschema= new mongoose.Schema(
{

name:{
    type:String,
    required:true
},
number:{
    type:Number,
    required:true
    
}})
const Contact=mongoose.model('Contact',contactschema)
module.exports=Contact;


