import Axios from 'axios';
import React,{useState} from 'react';
import { useHistory} from "react-router-dom"
import {Form,Button,DatePicker,Table, message} from "antd"
import  'antd/dist/antd.css';
import "./getbyDate.css"
import moment from "moment"
function GetByDate() {
    const history=useHistory()
    const back=()=>
    {
        history.push("/home")
    }
    const handlepost=async()=>
    {   if(date1===null||date2===null)
        {
        message.error("dates")
        
        }
        else{
        const  from=date1.format("YYYY-MM-DD")
        const to=date2.format("YYYY-MM-DD")
        const token=localStorage.getItem("login")
        const config = {
            headers: {
                'content-type': 'multipart/form-data',
                "Authorization" : `Bearer ${token}`
            }
        }
         await Axios.get("http://localhost:4000/getByDate/?fromDate="+from+"&toDate="+to,config)
        .then((result)=>{
            console.log(result.data.Data)
           setresponse(result.data.Data)
           
            
        })
        .catch((err)=>
        {
            console.log(err)
        })}
    }
    const columns=[{
        title: 'Name',
        dataIndex: 'Name',
        },
        {
            title:"Amount",
            dataIndex:"Amount"
        },
        {
            title:"Location",
            dataIndex:"Location"
        },
        {
            title:"Bill Image",
            dataIndex:"Bill",
            render: text => <a href={String("https://test-buckets98067.s3-eu-west-1.amazonaws.com/"+text)}>{text}</a>,
        }
    ]
    const now=moment()
   const [date1,setDate1]=useState(now);

    const [date2,setDate2]=useState(now)
   const [response,setresponse]=useState([])
    return (
        <div className="getbydate">
            <div className="searchdate">
                <Form onFinish={handlepost}>
                    <Form.Item label="From" name="from" rules={[{required:true}]}>
                        <DatePicker onChange={e=>setDate1(e)}></DatePicker>
                        </Form.Item>
                        <Form.Item label="To" name="to" rules={[{required:true}]}>
                        <DatePicker onChange={e=>setDate2(e)}></DatePicker>
                        </Form.Item>
                        <Form.Item >
                            <Button disabled="" type="primary"  htmlType="submit" onClick={handlepost} >Check</Button>
                        </Form.Item>
                        <Form.Item>
                            <Button type="ghost" onClick={back} htmlType="submit" > Back</Button>
                        </Form.Item>
                </Form>

             </div>
            <div>
            <Table dataSource={response} columns={columns} />;
            </div>

        </div>
    )
}
// 
export default GetByDate
