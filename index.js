const express = require('express');
const app=express();
const dbconnect=require('./Database/dbconnect');
const bodyParser = require('body-parser')

const mongoose=require('mongoose');

const Schema = require('./Database/schema');

const cookieParser=require('cookie-parser');

const cookie = require('cookie');

const uri="http://localhost:3000";

var cors = require('cors');

app.use(cors({ origin: uri , credentials :  true}));

// app.use( function (req, res,next) {
//     // res.header("Access-Control-Allow-Credentials", "true");
//     // , credentials :  true}
//     res.header("Access-Control-Allow-Origin", "http://localhost:3000" , {"credentials ":  "true"});
//     // res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
//     // res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    
//     next();
// })

app.use(cookieParser());
app.use(bodyParser.json());




function SetCookies(res,user_id){
    console.log(user_id)
    res.cookie("logged_in","true");
    res.cookie("session_id", user_id )
    res.cookie("secret_key","9K4vmxUDJm"   ,{
        httpOnly:true
    })

   
    return;
}

app.post('/signup',(req,res)=>{
    
    // 
    Schema.find({
        "user.email":`${req.body.email}`
    })
    .then(data=>{
        if(data.length==0){
            const schema =new Schema;
            schema.user=req.body;
            schema.save()
            .then(data=>{
                

                let user_id=data._id;
                SetCookies(res,user_id);
            
               return res.status(200).send("User registered");
            })
            .catch(err=>{
                
                return res.status(404).json({"data": err});
            })
        }
        else{
            
            return res.status(300).json({"data": "User already exists in the database"});
        }
    })
    .catch(err=>{
        
       return res.status(300).send({"data":err});
    })
    
});


function validateCookie(req,res,next){
    const {cookies}=req;
    let secret_key="9K4vmxUDJm";
    let id=cookies.session_id;

    if(cookies.secret_key==secret_key){
        Schema.findById(id).then(data=>{
            if(data.length==0){
               return res.status(401).redirect('/');
            }
            else{
                next();
                return;
            }
        })
    }
    else{
        return res.status(401).redirect('/');
    }
    return;

}
app.post('/login',(req,res)=>{
    console.log(req.body)
    Schema.find({
        "user.email":`${req.body.email}`,
        "user.password":`${req.body.password}`
    })
    .then(data=>{
        // 
        // 
        if(data.length==0){
            //user does not exists in data base
            return res.status(404).send({"data":"Wrong email or password"})
        }
        else{
            //user found with correct credentials

            //save the object id in cookie
            let user_id=data[0]._id;
            SetCookies(res,user_id);
         
        
            
            return res.status(200).send({"data":"Login Successful!"});
        }
    })
    .catch(err=>{
        //error in connecting to the server
        res.status(300).send({"data":"Server Error"});
    })
})
app.get('/protected',(req,res,next)=>{
    

    // SetCookies(res,1);
    res.send("hello")
    
})
app.listen(4000,()=>{
    
})