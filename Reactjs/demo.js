import Axios from 'axios';
import React,{useEffect,useState} from 'react';
import { useHistory} from "react-router-dom"
import "./demo.css"
function Demo() {
    const history=useHistory();
    const [value,setname]=useState("tiger.jpg")
    const [response,setvalue]=useState([])
    useEffect(() => {
        const token=localStorage.getItem("login")
        const config = {
            headers: {
                
                "Authorization" : `Bearer ${token}`
            }
        }
        Axios.get("http://localhost:4000/getTotal",config)
        .then((result)=>
        {
            console.log(result.data)
            setvalue(Array(result.data))
        })
        .catch((err)=>
        {
            console.log(err)
        })
    },[])
     
    const AddBill=()=>
    {
        history.push("/adddata")
    }
    const Name=()=>
    {
        history.push("/name")
    }
    const Location=()=>
    {
        history.push("/location")
    }
    const Date=()=>
    {
        history.push("/date")
    }
    const logout=()=>
    {   localStorage.removeItem("login")
        history.push("/")
    }
    return (
        <div >
           <div className="headers23">
            <div className="subnav">
                <div className="subbtn">sarath</div>
                   
                 <div className="contents1">
                    <a>s</a>
                    <a>a</a>
                    <a>r</a>
                 </div>
             </div>
             <div className="subnav">    
                <div>madhan</div>
                <div className="contents1">
                    <a>m</a>
                    <a>a</a>
                    <a>d</a>
                 </div>
                
            </div>
        </div>
        <div className="checkbody">
        <div className="body1">
            <div className="bodycontent1">
                <img src={require("./images/qlJ3_Mhos_Screenshot (38).png.jpg")}></img>
            </div>
            <div className="bodycontent2">
            <img src={require("./images/22RgUYwt9_Screenshot (38).png.jpg")}></img>
         
            </div>
            <div className="bodycontent3">
            <img src={require("./images/22RgUYwt9_Screenshot (38).png.jpg")}></img>

            </div>
            </div>
            <footer>


            </footer>
        </div>
        </div>
    )
}

export default Demo
