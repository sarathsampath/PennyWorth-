const DatabaseHelper=require("../Utils/Database")


async function getByLocation(id,location)
{
    const response=await DatabaseHelper.QueryLocationDatabase(id,location);
    return response

}
async function getByName(id,Name)
{console.log("service Name")
    const response=await DatabaseHelper.QueryNameDatabase(id,Name);
    console.log(response)
    const response1=await DatabaseHelper.QueryTotalDatabase(id);
    console.log(response1)
    const totalDivide=response1.Data/response.Data.length
    console.log(totalDivide,"divide")
    for(let i=0;i<response.Data.length;i++)
    {   
        response.Data[i].Amount=totalDivide-response.Data[i].Amount
        console.log(response.Data[i].Amount)
    }
    return response
}
async function getByDate(id,from,to)
{console.log("service date")
    const response=await DatabaseHelper.QueryDateDatabase(id,from,to);
    return response

}
async function deleteByDate(id,from,to)
{console.log("service date")
    const response=await DatabaseHelper.QuerydeleteDateDatabase(id,from,to);
    return response

}
async function getTotal(id)
{console.log("service Total")
const response=await DatabaseHelper.QueryTotalDatabase(id);
    return response

}
module.exports={getByLocation,deleteByDate,getByName,getByDate,getTotal}