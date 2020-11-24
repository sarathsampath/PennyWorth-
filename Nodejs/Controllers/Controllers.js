const ServiceSignup=require("../Services/ServiceSignup")
const ServiceLogin=require("../Services/ServiceLogin")
const ServiceAddBill=require("../Services/ServiceAddBill")
const ServiceQuery=require("../Services/ServiceQuery")
const ServiceMemories=require("../Services/ServiceMemories")
async function Signup(Mail,Name,Password)
{
    console.log("Controllers signup Start")
    const status=await ServiceSignup.Signup(Mail,Name,Password);
    console.log("Controllers signup End")
    return status;
}
async function Login(Mail,Password)
{
    console.log("Controllers Login Start")
    const status=await ServiceLogin.ServiceLogin(Mail,Password);
    console.log("Controllers Login End")
    return status;
}

async function addBill(Id,Name,Location,Amount,PaymentMode,Bill)
{
    console.log("Controllers addBill Start")
    const status=await ServiceAddBill.AddBill(Id,Name,Location,Amount,PaymentMode,Bill);
    console.log("Controllers addBill End")
    return status;
}

async function getByLocation(id,location)
{
    const status=await ServiceQuery.getByLocation(id,location);
    return status;
}
async function getByName(id,Name)
{console.log("controllers NAme")
    const status=await ServiceQuery.getByName(id,Name);
    return status;
}
async function getByDate(id,from,to)
{console.log("controllers Date")
    const status=await ServiceQuery.getByDate(id,from,to);
    return status;
}
async function deleteByDate(id,from,to)
{console.log("controllers Date")
    const status=await ServiceQuery.deleteByDate(id,from,to);
    return status;
}
async function getTotal(id,from,to)
{console.log("controllers Total")
    const status=await ServiceQuery.getTotal(id);
    return status;
}

async function uploadMemories(Id,Images)
{
console.log("Controllers start Memories")
const status=await ServiceMemories.uploadMemories(Id,Images)
return status;
}
async function getMemories(Id)
{
console.log("Controllers start Memories")
const status=await ServiceMemories.getMemories(Id)
return status;
}
async function deleteMemories(Id,ImageName)
{
console.log("Controllers start delete Memories")
const status=await ServiceMemories.deleteMemories(Id,ImageName)
return status;
}
module.exports={uploadMemories,deleteByDate,deleteMemories,getMemories,Signup,Login,addBill,getByLocation,getByName,getByDate,getTotal  }
