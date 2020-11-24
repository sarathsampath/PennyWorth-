const express=require("express")
const bodyparser=require("body-parser")
const app=express()
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended:true}));
const dotenv=require("dotenv");
dotenv.config();
const cors=require("cors")
app.use(cors())
const Response=require("./Utils/response");
const jwt=require("jsonwebtoken")
const fileupload = require('express-fileupload')
app.use(fileupload())
const UtilsHelperDatabase=require("./Utils/Database")
const RoutesHelper=require("./Routes/Routes")

UtilsHelperDatabase.databasecheck();

async function check(req,res,next)
{try
    {   
        var data=req.headers.authorization.split(" ")[1];

        const decoded=jwt.verify(data,process.env.SECRET_KEY)
        console.log(decoded);
        
        req.id=decoded.id
        next()
    }
    catch(err)
    {
        const response=await Response.SendResponse(false,"INVALID TOKEN","400")
        res.send(response)
    }

}

app.post("/signup",RoutesHelper.Signup);
app.post("/login",RoutesHelper.Login)
app.post("/addBill",check,async function(req,res,next){
    const Id=req.id
    console.log(Id)
    console.log(req.body)
    RoutesHelper.addBill(req,res,Id)
}) ;
app.get("/getTotal",check,async function(req,res,next)
{const Id=req.id
    console.log(Id)
    RoutesHelper.getTotal(req,res,Id)
})
app.get("/getByLocation",check,async function(req,res,next)
{const Id=req.id
    console.log(Id)
    RoutesHelper.getByLocation(req,res,Id)
})

app.get("/getByName",check,async function(req,res,next)
{const Id=req.id
    console.log(Id)
    RoutesHelper.getByName(req,res,Id)
})


app.get("/getByDate",check,async function(req,res,next)
{const Id=req.id
    console.log(Id)
    RoutesHelper.getByDate(req,res,Id)
})


app.delete("/deleteByDate",check,async function(req,res,next)
{   const Id=req.id
    console.log(Id)
    console.log(req.query)
    RoutesHelper.deleteByDate(req,res,Id)
})
app.post("/uploadMemories",check,async function(req,res,next)
{   const Id=req.id
    RoutesHelper.uploadMemories(req,res,Id)
})
app.get("/getMemories",check,async function(req,res){
    const Id=req.id
    RoutesHelper.getMemories(req,res,Id)
})
app.delete("/deleteMemories",check,async function(req,res,next){
    const Id=req.id;
    RoutesHelper.deleteMemories(req,res,Id)
    
})
app.listen(4000);