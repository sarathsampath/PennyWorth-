import Axios from 'axios';
import React,{useState} from 'react';
import { useHistory} from "react-router-dom"
import  'antd/dist/antd.css';
import "./getbyName.css"
import {Form,Button,Input,Table} from "antd"
function GetByName() {
    const history=useHistory()
    const back=()=>
    {
        history.push("/home")
    }
    const handlepost=async()=>
    {
       const token=localStorage.getItem("login")
        const config = {
            headers: {
                'content-type': 'multipart/form-data',
                "Authorization" : `Bearer ${token}`
            }
        }
        await Axios.get("http://localhost:4000/getByName/",config)
        .then((result)=>{
            console.log(result.data.Data)
           setresponse(result.data.Data)
           
            
        })
        .catch((err)=>
        {
            console.log(err)
        })
    }
    const columns=[
        {
            title:"Name",
            dataIndex:"Name"
        },
        {
            title:"Amount",
            dataIndex:"Amount"
        }
    ]
    
    const [response,setresponse]=useState([])
    return (
        <div className="getbyname">
            <div className="searchname">
<Form>
    <Form.Item name="Name" label="Amount Sharing">
    <Button type="primary" htmlType="button" onClick={handlepost}>check</Button>
        </Form.Item>
        <Form.Item>
            <Button type="default" htmlType="submit" onClick={back}>Back</Button>
        </Form.Item>
</Form>
            </div>
            <div>
            <Table dataSource={response} columns={columns} />;
            </div>

            </div>
    )
}

export default GetByName
