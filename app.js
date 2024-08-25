//Basic module requirements
const express=require("express");
const app=express();
const imgur=require('imgur');
const fileUpload=require('express-fileupload')
const mysql = require('mysql');
const cors = require("cors");
const fs = require('fs');
const dotenv=require("dotenv");
dotenv.config({path: "./.env"});
const authRoutes = require("./routes/authRoutes");
let port= 3000;
const path = require('path')
app.set("view engine","ejs");
app.set('views', 'views')
app.use(fileUpload());
app.use(cors());
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use('/', express.static(path.join(__dirname, 'public')))
app.post('/login',authRoutes);
app.post('/register',authRoutes);
app.listen(port,(req,res)=>{
    console.log("Server start");
})

// mysql connection
const con=mysql.createConnection({
    host: "localhost",
    user: "root",
    password: process.env.password,
  database: "ngo"
})
 
app.get("/sign",(req,res)=>{
  res.render("sign.ejs");
})
app.get("/login",(req,res)=>{
  res.render("login.ejs");
})



//NGO display
app.post("/search",(req,res)=>{ 
    let pincode=req.body.pincode;
    let ngoarray=[];
    let que="select * from user where Pincode like ?";
        con.query(que,[pincode.substr(0,6)+"%"],function(err,result){
          if(err) throw err;
          ngoarray.push(result);
          con.query(que,[pincode.substr(0,5)+"%"],function(err,result){
            if(err) throw err;
            ngoarray.push(result);
            con.query(que,[pincode.substr(0,4)+"%"],function(err,result){
              if(err) throw err;
              ngoarray.push(result);
              let list=ngoarray[2];
              res.render("ngo.ejs",{list});

            })
          })
        })
      })
//ngo from user -> profile
app.get("/userprofile",(req,res)=>{
       let name=req.query.name;
        // console.log(name);
        con.query("select * from user where NGO=?",[name],function(err,result){
          if(err) throw err;
          // console.log(result);
          res.render("userprofile.ejs",{result});
        })
      })

      //photo upload on api
      app.post('/upload', (req, res) => {
        if (!req.files) {
          return res.status(400).send('No files were uploaded.')
        }
      
        let sampleFile = req.files.sampleFile
        let uploadPath = __dirname + '/uploads/' + sampleFile.name
        let{reque,location,phone}=req.body;
        let{name}=req.query;
      
        sampleFile.mv(uploadPath, function (err) {
          if (err) {
            return res.status(500).send(err)
          }
      
          imgur.uploadFile(uploadPath).then((urlObject) => {
            fs.unlinkSync(uploadPath)
            // console.log(urlObject.data.link);
            // console.log(name);
            con.query("insert into request values (?,?,?,?,?);",[reque,location,phone,urlObject.data.link,name],function(err,result){
              if(err) throw err;
              res.render("successreq.ejs");
            })
            // res.render('uploaded.ejs', { link: urlObject.data.link })
          })
        })
      })


      app.post("/deletecart",(req,res)=>{
        const{link}=req.body;
        const user=req.query.name;
        con.query("delete from request where image=?",[link],function(err,resul){
          if(err) throw err;
          con.query("select * from request where user=?",[user],function(err,result){
            if(err) throw err;
            res.render("ngoprofile.ejs",{result});
          })
        })
        
      })