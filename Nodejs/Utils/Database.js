const mysql=require("mysql")
const Response=require("../Utils/response")
const jwt=require("jsonwebtoken")
const bcrypt=require("bcrypt");
const dotenv=require("dotenv");
const { response } = require("express");
dotenv.config();

var con=mysql.createConnection(
    {
        host:process.env.HOST,
        user:process.env.USER,
        password:process.env.PASSWORD,
        database:process.env.DATABASE
    }
);

async function databasecheck()
{
return new Promise((resolve,reject)=>
{
    con.connect(function(err)
    {
        if(err) 
        {   
            reject(console.log(err));

        }
           
        else    
        {
            resolve(console.log("connected"));
        }
      
    });
});
}

async function SignupDatabase(Id,Mail,Name,Password)
{
    return new Promise((resolve,reject)=>
    {
    const Query1=`insert into Signup (Id,Mail,name,Password) values('${Id}','${Mail}','${Name}','${Password}')`
    con.query(Query1,async function(err,result)
    {
        if(err) 
        {
            const response=await Response.SendResponse(false,"Database Error","401")
            resolve(response)
        }   
        else
        {   const response=await Response.SendResponse(true,"Registered Succesfully","200")
            resolve(response)
        }
    });
 
});
}

async function SignupMail(Mail)
{
    return new Promise((resolve,reject)=>
    {
    const Query1=`select * from Signup where Mail='${Mail}'`
    con.query(Query1,async function(err,results,fields)
    {
        if(err) 
        {
            const response=await Response.SendResponse(false,"Database Error","401")
            resolve(response)
        }   
        else
        {  
            resolve(results)
        }
    });
 
});
}


async function LoginDatabase(Mail,password)
{
return new Promise((resolve,reject)=>
{
const Query2=`select * from Signup where Mail='${Mail}'`
con.query(Query2,async function(err,results,fields)
{
    if(err)
    {
        const response=await Response.SendResponse(false,"Database Error","401")
        resolve(response)
    }
    else
    {
        if(results.length==0)
        {
            const response=await Response.SendResponse(false,"Invalid Mail","400")
            resolve(response)
        }
        else{
            const ss=await bcrypt.compare(password,results[0].Password)
            if(ss==true)
            {  const secretKey=process.env.SECRET_KEY
        
            const ss=await jwt.sign({
                id:results[0].Id
              },secretKey,{expiresIn:36000}
            );
            const response=await Response.SendResponse(true,ss,"200")
            resolve(response)
            }
            else{
                const response=await Response.SendResponse(false,"Invalid Password","400")
                resolve(response)
            }
            
        }
    }
});
});
}

async function AddBillDatabase(Id,Name,Location,Amount,PaymentMode,Bill,Today)
{
    return new Promise((resolve,reject)=>
    {
    const Query1=`insert into Bill (Id,Name,Location,Amount,PaymentMode,Bill,PurchasedDate) values('${Id}','${Name}','${Location}','${Amount}','${PaymentMode}','${Bill}','${Today}')`
    console.log(Query1)
    con.query(Query1,async function(err,result)
    {
        if(err) 
        {
            console.log(err)
            const response=await Response.SendResponse(false,"Database Error","401")
            resolve(response)
        }   
        else
        {   const response=await Response.SendResponse(true,"Inserted Succesfully","200")
            resolve(response)
        }
    });
 
});
}

async function QueryLocationDatabase(Id,Location)
{   
    return new Promise((resolve,reject)=>
    {

        const Query=`select sum(Amount) AS total ,Name from Bill where Id="${Id}" and Location="${Location}" group by Name`;
        con.query(Query,async function(err,result,fields)
        {
            if(err)
            {
                const response=await Response.SendResponse(false,"Database Error","401")
                resolve(response)
            }
            else{
                const response=await Response.SendResponse(true,result,"200")
                 resolve(response)
            }
        })
    });
}


async function QueryNameDatabase(Id,Name)
{   console.log("Database")


    return new Promise((resolve,reject)=>
    {

        const Query=`select Name,sum(Amount) as Amount from Bill where Id="${Id}" group by Name `;
        con.query(Query,async function(err,result,fields)
        {
            if(err)
            {
                const response=await Response.SendResponse(false,"Database Error","401")
                console.log(err)
                resolve(response)
            }
            else{
                const response=await Response.SendResponse(true,result,"200")
                resolve(response)
                }
        })
    });
    
}

async function QueryDateDatabase(Id,from,to)
{   console.log("Database")


    return new Promise((resolve,reject)=>
    {

        const Query=`select Name,Amount,Location,Bill from Bill where (DATE(PurchasedDate) between "${from}" and "${to}") `;
        console.log(Query)
        con.query(Query,async function(err,result,fields)
        {
            if(err)
            {   console.log(err)
                const response=await Response.SendResponse(false,"Database Error","401")
                resolve(response)
            }
            else{const response=await Response.SendResponse(true,result,"200")
            resolve(response)
            }
        })
    });
}
async function QueryTotalDatabase(Id)
{   console.log("Database")


    return new Promise((resolve,reject)=>
    {

        const Query=`select sum(Amount) as total from Bill where Id="${Id}" `;
       
        console.log(Query)
        con.query(Query,async function(err,result,fields)
        {
            if(err)
            {   console.log(err)
                const response=await Response.SendResponse(false,"Database Error","401")
                resolve(response)
            }
            else{
                
                
                const response=await Response.SendResponse(true,result[0].total,"200")
                resolve(response)
              
               
            }
        })
    });
}


async function uploadMemories(Id,ImageName)
{
    console.log("Database UploadMemories")
    return new Promise((resolve,reject)=>{
        const Query1=`Insert into Memories (Id,Image_Name) values('${Id}','${ImageName}') `
        con.query(Query1,async function(err,results,fields)
        {
        if(err)
        {   console.log(err)
            const response=await Response.SendResponse(false,"Database Error","401")
            resolve(response)
        }
        else{const response=await Response.SendResponse(true,"uploaded","200")
        resolve(response)
        }
    })
})
}

async function getMemories(Id)
{
    console.log("Database retriveMemories")
    return new Promise((resolve,reject)=>{
        const Query1=`select * from Memories where Id="${Id}"`
        con.query(Query1,async function(err,results,fields)
        {
        if(err)
        {   console.log(err)
            const response=await Response.SendResponse(false,"Database Error","401")
            resolve(response)
        }
        else{const response=await Response.SendResponse(true,results,"200")
        resolve(response)
        }
    })
})
}

async function deleteMemories(Id,Image_Name)
{
    console.log("Database deleteMemories")
    return new Promise((resolve,reject)=>{
        const Query1=`delete from Memories where Id="${Id}" and Image_Name="${Image_Name}"`
        console.log(Query1)
        con.query(Query1,async function(err,results,fields)
        {
        if(err)
        {   console.log(err)
            const response=await Response.SendResponse(false,"Database Error","401")
            resolve(response)
        }
        else{const response=await Response.SendResponse(true,"Image Deleted","200")
        console.log(response)
      resolve(response)
        }
    })
})
}


async function QuerydeleteDateDatabase(Id,from,to)
{   console.log("Database")


    return new Promise((resolve,reject)=>
    {
        const Query=`delete from Bill where Id="${Id}" and (DATE(PurchasedDate) between "${from}" and "${to}")`
        console.log(Query)
        con.query(Query,async function(err,result,fields)
        {
            if(err)
            {   console.log(err)
                const response=await Response.SendResponse(false,"Database Error","401")
                resolve(response)
            }
            else{const response=await Response.SendResponse(true,result,"200")
            console.log(response)
           // resolve(response)
            }
        })
    });
}



module.exports={uploadMemories,QuerydeleteDateDatabase,deleteMemories,getMemories,QueryTotalDatabase,QueryDateDatabase,QueryNameDatabase,QueryLocationDatabase,databasecheck,SignupDatabase,SignupMail,LoginDatabase,AddBillDatabase}






