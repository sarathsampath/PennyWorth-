const DatabaseHelper=require("../Utils/Database")
const jwt=require("jsonwebtoken")

async function ServiceLogin(Mail,Password)
{
    const response=await DatabaseHelper.LoginDatabase(Mail,Password);
    return response;
}

module.exports={ServiceLogin}