import {useEffect,useState} from "react"
import {Route,Routes } from 'react-router-dom'
import Home from './component/Home'
import Auth from './component/Auth'
import Notes from './component/Notes';
import History from './component/History';
import Pricing from './component/Pricing';
import ProtectedRoute from './component/ProtectedRoute';
import {getCurrentUser} from "./services/api.js"
import {useDispatch, useSelector} from "react-redux"
import NoteView from "./component/NoteView.jsx";
import PaymentSuccess from "./component/PaymentSuccess.jsx";
import PaymentFailed from "./component/PaymentFailed.jsx";

export const ServerUrl = (
  import.meta.env.VITE_SERVER_URL ||
  "https://examnotesai-d7lt.onrender.com"
).replace(/\/+$/, "");

 function App () {

  const dispatch = useDispatch();
  useEffect(()=>{
     getCurrentUser(dispatch);
    
  },[dispatch])
 


  return (
    <div className =" min-h-screen bg-white dark:bg-gray-950 text-black light:text-white transition-colors duration-300">
  
    <Routes>
      <Route path="/" element = {<Home/>}></Route>
      <Route path = "/auth" element = {<Auth/>}></Route>

      <Route path = "/notes"
       element = {<ProtectedRoute><Notes/></ProtectedRoute>}>
      </Route>
      <Route path = "/notes/:id"
       element = {<ProtectedRoute><NoteView/></ProtectedRoute>}>
      </Route>

      <Route path = "/history"
       element = {<ProtectedRoute><History/></ProtectedRoute>}>
      </Route>
    

      <Route path = "/pricing" element = {<Pricing />}></Route>
      <Route path = "/payment-success" element = {<PaymentSuccess />}></Route>
      <Route path = "/payment-failed" element = {<PaymentFailed />}></Route>
    </Routes>
    </div>
  )
}

export default App
