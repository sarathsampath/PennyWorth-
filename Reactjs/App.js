import React,{useState,useMemo} from 'react';
import logo from './logo.svg';
import {Route,BrowserRouter} from "react-router-dom";
import Signup from"./signup"
import Login from "./login"
import Bill from "./Bill"
import PrivateRoute from "./privateRoute"
import Location from "./getByLocation"
import Name from "./getByName"
import Date from "./getByDate"
import Home from "./homepage"
import Delete from "./DeleteByDate"
import UploadBill from "./uploadMemories"
import {UserContext} from "./usercontext"
function Routes()
{
  const [value,setvalue]=useState("ssfs")
  const providervalue=useMemo(()=>({value,setvalue}),[value,setvalue])
  return(
    <div>
  <BrowserRouter>
  <switch>
  <UserContext.Provider value={providervalue}>
    <Route path="/" exact component={Login}/>
    <Route path="/signup" exact component={Signup}/>
    
    <PrivateRoute path="/location" exact component={Location}/>
    <PrivateRoute path="/name" exact component={Name}/>
    <PrivateRoute path="/date" exact component={Date}/>
    <PrivateRoute path="/home" exact component={Home}/>
    
    <PrivateRoute path="/adddata" exact component={Bill}/>
    <PrivateRoute path="/upload" exact component={UploadBill}/>
    </UserContext.Provider>
    
    <Route path="/delete" exact component={Delete}/>
</switch>
  </BrowserRouter>
</div>
  )
}



export default Routes;
/*

                */