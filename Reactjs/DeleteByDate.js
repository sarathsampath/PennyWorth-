import Axios from 'axios';
import React,{useState} from 'react';
import { useHistory} from "react-router-dom"
import {Form,Button,Popconfirm,DatePicker,message} from "antd"
import  'antd/dist/antd.css';
import "./DeleteByDate.css"
function DeleteByDate() {
    const history=useHistory()
    const back=()=>
    {
        history.push("/home")
    }
    const cancel=()=>
    {
        message.error("Cancelled")
    }
    const handlepost=async()=>{
   
        if(date1==null || date2==null)
        {
            message.error("Enter Date")
        }
        else{

        
        const  from=date1.format("YYYY-MM-DD")
        const to=date2.format("YYYY-MM-DD")
        console.log(from,to)
        const token=localStorage.getItem("login")
        
        const config = {
            headers: {
                'content-type': 'multipart/form-data',
                "Authorization" : `Bearer ${token}`
            }
        }
         await Axios.delete("http://localhost:4000/deleteByDate?from="+from+"&to="+to,config)
        .then((result)=>{
            console.log(result.data.Data)
            message.success("Data Cleared")
           
            
        })
        .catch((err)=>
        {
            console.log(err)
        })
    }}
   const [date1,setDate1]=useState();

    const [date2,setDate2]=useState()
   
    return (
        
        <div>
            <div className="headers12">
                <p>Clear Budegets Daily,Weekly,Monthly</p>
            </div>
            <div className="deletedate">
                <Form >
              
                    <Form.Item label="From" name="from" rules={[{required:true}]}>
                        <DatePicker onChange={e=>setDate1(e)}></DatePicker>
                        </Form.Item>
                        <Form.Item label="To" name="to" rules={[{required:true}]}>
                        <DatePicker onChange={e=>setDate2(e)}></DatePicker>
                        </Form.Item>
                        <Form.Item >
                            <Popconfirm  title="Are you sure to Clear Data?"
                                onConfirm={handlepost}
                                onCancel={cancel}
                                okText="Yes"
                                cancelText="No" placement="top">
                            <Button  type="primary"  htmlType="submit"  >Confirm</Button>
                        
                            </Popconfirm>
                            </Form.Item>
                        <Form.Item>
                            <Button type="ghost" onClick={back} htmlType="submit" > Back</Button>
                        </Form.Item>
                </Form>

             </div>
          

        </div>
    )
}
// 
export default DeleteByDate
