const shortId=require("shortid")
const bcrypt=require("bcrypt")
const DatabaseHelper=require("../Utils/Database")
const Response=require("../Utils/response")
async function Signup(Mail,Name,Password)
{
console.log("services signup Start")    
const Id=shortId.generate();    
var salt = bcrypt.genSaltSync(10);
var hash = bcrypt.hashSync(Password, salt);
const results=await DatabaseHelper.SignupMail(Mail);
if(results.length!=0)
{
    const response=Response.SendResponse(true,"Already registered","200")
    return response
}
else
{
const status=await DatabaseHelper.SignupDatabase(Id,Mail,Name,hash);
console.log("Services signup End")
return status;
}
}
module.exports={Signup}
