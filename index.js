const express= require('express');
const port=8000;
const db=require('./config/mongoose');
const Contact=require('./models/contact');
const app=express();
const path=require('path')
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.urlencoded(),  );
app.use(express.static('assets'));

const methodOverride = require('method-override')
app.use(methodOverride('_method'))

function wrapasync(fn){

  return function(req,res,next){
    fn(req,res,next).catch(e=>next(e))
  }

}

app.get('/contacts',function(request,response)
{
Contact.find({},(error,contacts)=>{    //we can use find for displaying some particular conatcts using name id e.t.c
if(error){
  console.log('error')
  return;
}
  response.render('home',{
    
    contact_list : contacts
})});


})

app.get('/contacts/add',(req,res)=>{

res.render('add')

})

app.post('/create',wrapasync(async(request,response,next)=>
{
  console.log(request.body.contact);
  const c= new Contact(request.body.contact);
    await c.save();
    response.redirect('/contacts')
  }))

app.get('/delete-contact',function(request,response)
{

let id=request.query.id;

Contact.findByIdAndDelete(id,function(error){
  if(error){
    console.log('error')
    return;
  }
  return response.redirect('back');

});



});

app.get('/contacts/:id/edit',async(req,res)=>{

const {id} = req.params;

const p= await Contact.findById(id);
res.render('edit',{p});

})

app.put('/contacts/:id', async (req, res) => {
  const { id } = req.params;
  const contact = await Contact.findByIdAndUpdate(id, req.body, { runValidators: true, new: true });
  res.redirect(`/contacts/${contact.id}`);
})
app.get('/contacts/:id',async(req,res)=>{

  const {id} = req.params;
  
  const contact= await Contact.findById(id);
  res.render('show',{contact});
  
  })


  app.use((err,req,res,next)=>{
     console.log(err)
    res.send( 'oh boy error');
  })
app.listen(port,function(err)
{

    if(err)
    {
        console.log("no")
        return;
    }
    console.log('running good');
});