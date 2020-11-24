import React,{useState} from 'react'
import {useHistory} from "react-router-dom";
import "./signup.css"
import axios from "axios"
import {Form,Input,Button} from "antd"
function Signup() {
    const history=useHistory();

    const handleLogin=()=>
    {
        
        history.push("/")
    }
    
    const handleclick=async ()=>
    {
        console.log(Mail,Password,Name); 
        const value={
            "Mail":Mail,
            "Name":Name,
            "Password":Password
        }
        await axios.post("http://localhost:4000/signup",value)
        .then((result)=>{
            console.log(result.data)
            setresponse(Array(result.data))
            
        })
        .catch((err)=>
        {
            console.log(err)
        })
       
     }
    const [Mail,setMail]=useState("")
    const [Name,setName]=useState("")
    const [Password,setPassword]=useState("")
    const [response,setresponse]=useState([])
    return (
        <div className="items">
            <div>
                <Form>
                    <Form.Item name="Mail" label="Mail" 
                    rules={[{
                        required:true,
                        message:"Enter Mail Id"
                    }]}>
                        <Input onChange={e=>setMail(e.target.value)}/>

                    </Form.Item>
                    <Form.Item name="Name" label="Name" 
                    rules={[{
                        required:true,
                        message:"Enter Name"
                    }]}>
                        <Input onChange={e=>setName(e.target.value)}/>

                    </Form.Item>
                    <Form.Item name="Password" label="Password" 
                    rules={[{
                        required:true,
                        message:"Enter Password"
                    }]
                    }hasFeedback>
                        <Input onChange={e=>setPassword(e.target.value)}/>

                    </Form.Item>
                    <Form.Item name="confirm" label="confirm Password" 
                    dependencies={["Password"]}
                    hasFeedback
                    rules={[{
                        required:true,
                        message:"Enter Password"
                    },
                    ({getFieldValue})=>({
                        validator(rule,value){
                            if(getFieldValue("Password")===value)
                            {
                                console.log(getFieldValue("Password"),value)
                                return Promise.resolve()
                            }
                            else{
                                console.log(getFieldValue("Password"),value)
                            return Promise.reject("Password Didnot Match")
                            }
                            
                        }

                    })
                ]
                    }>
                        <Input />

                    </Form.Item>
                    <Form.Item>
                        <Button htmlType="submit" type="primary" onClick={handleclick} >
                            Signup
                        </Button>
                    </Form.Item>
                    <Form.Item>
                        <Button htmlType="submit" type="primary" onClick={handleLogin} >
                            Back
                        </Button>
                    </Form.Item>
                </Form>
            </div>
           
            <div>{response.map((post)=><div>{post.Data}</div>)}</div>

            
        </div>
    )
}

export default Signup
