const express = require("express"); 
const ControllersHelper=require("../Controllers/Controllers") 
 
 
 async function Signup(req,res)
 {   console.log("Routes signup Start")
     const Mail=req.body.Mail;
     const Name=req.body.Name;
     const Password=req.body.Password;
     const status=await ControllersHelper.Signup(Mail,Name,Password);
     console.log("Routes signup end")
     res.send(status)

 }


 async function Login(req,res)
 {   console.log("Routes Login Start")
     const Mail=req.body.Mail;
     const Password=req.body.Password;
     const status=await ControllersHelper.Login(Mail,Password);
     console.log("Routes Login end")
     res.send(status)

 }

 async function addBill(req,res,Ids)
 {   console.log("Routes addBill Start")
    const Id=Ids
    const Name=req.body.Name;
     const Location=req.body.Location;
     const Amount=req.body.Amount
     const PaymentMode=req.body.PaymentMode;
     const Bill=req.files.files;
     console.log(Bill)
    const status=await ControllersHelper.addBill(Id,Name,Location,Amount,PaymentMode,Bill);
     console.log("Routes addBill end")
     res.send(status)

 }
 async function getTotal(req,res,Id)
 {
     
     const id=Id
     const status=await ControllersHelper.getTotal(id)
     res.send(status)
 }

 async function getByLocation(req,res,Id)
 {
     const location=req.query.Location;
     const id=Id
     const status=await ControllersHelper.getByLocation(id,location)
     res.send(status)
 }

 async function getByName(req,res,Id)
 {  console.log("routes Name")
     const Name="";
     const id=Id
     const status=await ControllersHelper.getByName(id,Name)
     res.send(status)
 }
 async function getByDate(req,res,Id)
 {  console.log("routes Date")
     const fromDate=req.query.fromDate;
     const toDate=req.query.toDate

     const id=Id
     const status=await ControllersHelper.getByDate(id,fromDate,toDate)
     res.send(status)
 }
 async function deleteByDate(req,res,Id)
 {  console.log("routes Date")
     const fromDate=req.query.from;
     const toDate=req.query.to;

     const id=Id
     const status=await ControllersHelper.deleteByDate(id,fromDate,toDate)
     res.send(status)
 }
 async function uploadMemories(req,res,Id)
 {
     console.log("routes Upload Memories");
     const Images=req.files.files;
     const id=Id;
     const status=await ControllersHelper.uploadMemories(id,Images);
     res.send(status);
 }
 async function getMemories(req,res,Id)
 {
     console.log("routes get Memories");
     
     const id=Id;
     const status=await ControllersHelper.getMemories(id);
     res.send(status);
 }
 async function deleteMemories(req,res,Id)
 {
     console.log("routes delete Memories");
     
     const id=Id;
     const ImageName=req.query.ImageName
     console.log(ImageName)
     const status=await ControllersHelper.deleteMemories(id,ImageName);
     res.send(status);
 }
module.exports={uploadMemories,deleteByDate,deleteMemories,getMemories,getTotal,Signup,Login,addBill,getByLocation,getByName,getByDate} 