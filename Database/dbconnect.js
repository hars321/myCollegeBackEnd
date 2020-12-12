const mongoose=require('mongoose');


const uri = "mongodb+srv://hgarg1666:gboubSpJK4s5N9Ly@cluster0.a2dsg.mongodb.net/newdb?retryWrites=true&w=majority";

let dbconnect=mongoose.connect(uri,{useNewUrlParser: true, useUnifiedTopology: true})
.then(data=>{
    console.log("connected to Data Base");
})
.catch(err=>{
    console.log(err.message);
});

module.exports=dbconnect;