import Axios from 'axios';
import React,{useState,useContext} from 'react';
import { useHistory} from "react-router-dom"
import {Form,Button,Upload,message} from "antd"
import { UserContext } from './usercontext';
import "./uploadMemories.css"
 
function UploadMemories() {
    const [response,setresponse]=useState([])
    const {value,setvalue}=useContext(UserContext)
    console.log(value)
    const history=useHistory()
    const back=()=>
    {
        history.push("/home")
    }
    const handlesubmit=async()=>
    {
        if(Bill==null)
        {
            message
            .info("upload a new file")
        }
        else{
       console.log(Bill,"sa")
       
       const formdata=new FormData();
       formdata.append("files",Bill)
       const token=localStorage.getItem("login")
        const config = {
            headers: {
                'content-type': 'multipart/form-data',
                "Authorization" : `Bearer ${token}`
            }
        }
        await Axios.post("http://localhost:4000/uploadMemories",formdata,config)
        .then((result)=>{ 
           console.log(result.data)
           message
            .info("File Uploaded")
           setresponse(Array(result.data))
           setFile(null)
            
        })
        .catch((err)=>
        {
            message
            .error("File Not Uploaded")
            console.log(err)
        })
    }
    }
   const [Bill,setFile]=useState(null)
    
    return (
        
        <div className="mainMemories">
            <div className="headers">
                <div className="logo">
                    <img className="logoImage" src={require("./images/images.png")}></img>
                </div>
             </div>
         
            <div className="Memories">
                
                <Form className="formclass2">
                    <Form.Item name="Bill"    label="Upload Memories"
                   >
                      <input type="file" onChange={e=>setFile(e.target.files[0])}/>  

                    </Form.Item>
                <Form.Item>
                    <Button className="Button2" type="primary" htmlType="submit" onClick={handlesubmit}>Submit</Button>
                </Form.Item>
                <Form.Item>
                    <Button className="Button2" type="ghost" htmlType="submit" onClick={back}>Back</Button>
                </Form.Item>
              
                </Form>
            </div>
            
            
           
        </div>
    )
}

export default UploadMemories
