import Axios from 'axios';
import React,{useEffect,useState,useContext} from 'react';
import { useHistory} from "react-router-dom"
import { UserContext } from './usercontext';
import "./homepage.css"   
    
function Homepage() {
 
    const {value,setvalue}=useContext(UserContext)
    console.log(value)
    const [check,setcheck]=useState(true)
    const history=useHistory();
    const [image,setimage]=useState([])
    const [response,setrespone]=useState([])
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
            setrespone(Array(result.data))
        })
        .catch((err)=>
        {
            console.log(err)
        })
    },[])
     
   useEffect(() => {
       console.log("image efffect")
        const token=localStorage.getItem("login")
        const config = {
            headers: {
                
                "Authorization" : `Bearer ${token}`
            }
        }
        Axios.get("http://localhost:4000/getMemories",config)
        .then((result)=>
        {
            console.log(result.data)
            setimage(result.data.Data)
        })
        .catch((err)=>
        {
            console.log(err)
        })
    },[check])
    const handleDelete=(e)=>

    {
        console.log(e)
           console.log("hi")
         
           const token=localStorage.getItem("login")
           const config = {
               headers: {
                   
                   "Authorization" : `Bearer ${token}`
               }
           }
           Axios.delete("http://localhost:4000/deleteMemories?ImageName="+e,config)
           .then((result)=>
           {   setcheck(!check)
               console.log(result.data)
               
           })
           .catch((err)=>
           {
               console.log(err)
           })
        
    }
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
    const Memories=()=>
    {
        history.push("/upload")
    }
  const ClearBudget=()=>
  {
      history.push("/delete")
  }
    
    return (
        <div className="homediv">
            
          
          <div className="header">
            <div className="contents">
                <button  onClick={AddBill}>Addbill</button>
           
                <button onClick={Memories}>Memories</button>
           
                <button onClick={Name}>Search By Name</button>
                <button onClick={Location}>Search By Location</button>
            
                <button onClick={Date}>Search By Date</button>
            
                <button onClick={ClearBudget}>Clear Budget</button>
            
                <button onClick={logout}>Logout</button> 
            {response.map((i)=><div><label>Total spent:</label>{i.Data}</div>)}
          </div>
            </div>
           
          
           
            <div className="displayImages">  {image.map((i)=><div className="memories"><img className="Images1" src={require("C:/Users/sarat/OneDrive/Desktop/Trip React/projecttrip/src/images/"+i.Image_Name+".jpg")} alt="logo"  ></img><button className="ButtonDelete" onClick={()=>handleDelete(i.Image_Name)}>Delete</button>
             </div>
             )}</div>
            
            
           
          <div className="footer">
                <p className="footerText">Be slow to fall into friendship; but when thou art in, continue firm and constant!
                    </p>
          </div>
           
        </div>
    )
}

export default Homepage
       