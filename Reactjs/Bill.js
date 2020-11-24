import Axios from 'axios';
import React,{useState} from 'react';
import { useHistory} from "react-router-dom"
import {Form,Input,Button,Upload,Select,DatePicker, InputNumber,message} from "antd"
import "./Bill.css"
function Bill() {
    const history=useHistory()
    const back=()=>
    {
        history.push("/home")
    }
    const handlesubmit=async()=>
    {
       console.log(Bill,"sa")
        const formData = new FormData();
        formData.append("files",Bill)
        formData.append("Name",Name)
        formData.append("Location",Location)
        formData.append("Amount",Amount)
        formData.append("PaymentMode",PaymentMode)
        const token=localStorage.getItem("login")
        const config = {
            headers: {
                'content-type': 'multipart/form-data',
                "Authorization" : `Bearer ${token}`
            }
        }
        console.log(formData.file)
       await Axios.post("http://localhost:4000/addBill",formData,config)
        .then((response)=>
        { if(response.data)
            console.log(response)
        })
        .catch((err)=>
        {
            console.log(err)
        })
        

    }
    const {Option}=Select
    const [Name,SetName]=useState("")
    const [Location,setLocation]=useState("")
    const [Amount,setAmount]=useState(0)
    const [PaymentMode,setPaymentMode]=useState("")
    const [Bill,setFile]=useState([])
    
    return (
        
        <div className="billform">
            <div className="formclass">
                <Form >
                    <Form.Item className="label1" name="Name" label="Name"
                    rules={[{
                        required:true,
                        message:"Enter your Name"
                    }]}>
                        <Input className="Input1" onChange={e=>SetName(e.target.value)}/>
                    </Form.Item>
                    <Form.Item className="label1" name="location" label="Location"
                    rules={[{
                        required:true,
                        message:"Enter Location"
                    }]}>
                        <Input onChange={e=>setLocation(e.target.value)}/>
                    </Form.Item>
                    <Form.Item className="label1" name="Amount" label="Amount"
                    rules={[{
                        required:true,
                        message:"Required"
                    },
                    ()=>({
                        validator(rule,value)
                        {console.log(typeof( value))
                            if(typeof(value)!="number")
                            {
                                return Promise.reject("Only Number Allowed")
                            }
                            
                        }
                    })]}>
                        <InputNumber  onChange={e=>setAmount(e)}/>
                    </Form.Item>
                    <Form.Item className="label1" name="Payment" label="Payment Mode" rules={[{
                        required:true,
                        message:"Enter your Name"
                    }]}>
                        <Select onChange={e=>setPaymentMode(e)}>
                            <Option value="Cash">Cash</Option>
                            <Option value="Card">Card</Option>
                            <Option value="Phone">Phone payment</Option>
                        </Select>
                    </Form.Item>
                   <div  >
                   <input type="file" onChange={e=>setFile(e.target.files[0])}/>
                   </div>
                <Form.Item >
                    <Button className="Button1" type="primary" htmlType="submit" onClick={handlesubmit}>Submit</Button>
                </Form.Item>
                <Form.Item >
                    <Button className="Button1" type="ghost" htmlType="submit" onClick={back}>Back</Button>
                </Form.Item>
                </Form>
            </div>
            
        </div>
    )
}

export default Bill
