


async function SendResponse(status,data,statuscode)
{
var response={
    "isSuccess":status,
    "Data":data,
    "statuscode":statuscode
}
return response

}

module.exports={SendResponse}


