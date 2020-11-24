const AWS=require("aws-sdk")
const dotenv=require("dotenv");
dotenv.config();
const id=process.env.ID
const secretkey=process.env.SECRETKEY
const s3 = new AWS.S3({
    accessKeyId: id,
    secretAccessKey:secretkey
});

function s3fileupload(Bill_Name,Bill_data)
{
return new Promise((resolve,reject)=>
{
  const params={
    Bucket:process.env.BUCKETNAME,
    Key:Bill_Name,
    Body:Bill_data,
    ContentType:'image/jpeg',
    ACL:'public-read'
    }
    s3.upload(params,async function(err,data)
    {
    if(err){
        resolve(false)
    };
    console.log("file uploaded succesfully")
    resolve(true)
    })
})
}
module.exports={s3fileupload}