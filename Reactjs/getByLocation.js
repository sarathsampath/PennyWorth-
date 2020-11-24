import Axios from 'axios';
import React,{useState} from 'react';
import { useHistory} from "react-router-dom";
import  'antd/dist/antd.css';
import {Form,Button,Input,Table} from "antd"
import "./getbyLocation.css"
function GetByLocation() {
    const history=useHistory()
    const back=()=>
    {
        history.push("/home")
    }
    const handlepost=async()=>
    {
       console.log(Location);
       const token=localStorage.getItem("login")
        const config = {
            headers: {
                'content-type': 'multipart/form-data',
                "Authorization" : `Bearer ${token}`
            }
        }
        await Axios.get("http://localhost:4000/getByLocation/?Location="+Location,config)
        .then((result)=>{
            
            setresponse(result.data.Data)
           
            
        })
        .catch((err)=>
        {
            console.log(err)
        })
    }
    const [Location,setLocation]=useState("")
    const [response,setresponse]=useState([])
    const columns = [
        {
          title: 'Name',
          dataIndex: 'Name',
          key: 'Name',
        },
        {
          title: 'total',
          dataIndex: 'total',
          key: 'total'
        }
      ];
    return (
        <div className="getbylocation">
            <div className="searchlocation">
           <Form>
               <Form.Item name="Location" label="Location">
                    <Input onChange={e=>setLocation(e.target.value)}/>
               </Form.Item>
               <Form.Item>
                   <Button onClick={handlepost} htmlType="submit" type="primary">
                        Check
                   </Button>
                   </Form.Item>
                   <Form.Item>
                   <Button onClick={back} htmlType="button" type="link ">
                        Back
                   </Button>
               </Form.Item>
           </Form>
            </div>
            <div>
           
            <Table dataSource={response} columns={columns} />;
            </div>
        </div>
    )
}

export default GetByLocation
