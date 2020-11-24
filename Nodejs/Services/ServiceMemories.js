const DatabaseHelper=require("../Utils/Database")
const shortId=require("shortid")
async function uploadMemories(Id,Images)
{   console.log(Images.name)
    let TempId=shortId.generate()
    const ImageName=TempId+"_"+Images.name;
    Images.mv("C:/Users/sarat/OneDrive/Desktop/Trip React/projecttrip/src/images/"+ImageName+".jpg",function(err){
        if(err)
        {
            console.log(err)
        }
    })
    const status=await DatabaseHelper.uploadMemories(Id,ImageName)
    return status
}
async function getMemories(Id)
{
    const status=await DatabaseHelper.getMemories(Id)
    return status
}
async function deleteMemories(Id,ImageName)
{
    const status=await DatabaseHelper.deleteMemories(Id,ImageName)
    return status
}
module.exports={uploadMemories,deleteMemories,getMemories}