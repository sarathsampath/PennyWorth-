const DatabaseHelper=require("../Utils/Database")
const date=require("date-and-time")
const shortid=require("shortid")
const s3=require("../Utils/s3upload")
async function AddBill(Id,Name,Location,Amount,PaymentMode,Bill)
{   const id=shortid()
    var now=new Date();
    var Today=date.format(now,'YYYY-MM-DD')
    const Bill_Name=id+"_"+Bill.name
    console.log(Bill.data)
    Bill.mv("C:/Users/sarat/OneDrive/Desktop/Project Trip/Images/"+Bill_Name)
  const response=await DatabaseHelper.AddBillDatabase(Id,Name,Location,Amount,PaymentMode,String(Bill_Name),Today);
if(response.isSuccess==true)
{
//const dataupload=await s3.s3fileupload(Bill_Name,Bill.data);
const dataupload=true;
if(dataupload==true)
{ console.log("response",response)
  return response
 
}

} else{
  return response
}

}

module.exports={AddBill}