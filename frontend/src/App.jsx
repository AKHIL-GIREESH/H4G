import './App.css'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Routes, Route, Navigate } from "react-router-dom";
import Chatview from './pages/chatview'

function App() {

  return (
    <>
       <Routes>
        {/* <Route path="/" element={<Navigate to="/chat" />} /> */}
        <Route path="/chat" element={<Chatview />} />
      </Routes> 
    <ToastContainer />
    </>
  )
}

export default App
