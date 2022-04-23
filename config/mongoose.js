const mongoose=require('mongoose')
mongoose.connect('mongodb://localhost/contact-list_db')
const db= mongoose.connection  //db will be used for accesing database
db.on('error',console.error.bind(console,'error connection to db'))
db.once('open',function(){

    console.log('success connection to db')
});