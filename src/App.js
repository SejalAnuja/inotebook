//import logo from './logo.svg';
import { useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Login from './components/Login';
import Alert from './components/Alert';
import CreateUser from './components/CreateUser'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NoteState from './context/notes/NoteState';
function App() {
  const [alert,setalert] = useState(null);
   const showAlert = (message,type)=>{
    setalert({
      msg: message,
      type: type
    }
    )
  }
  setTimeout(() => {
    setalert(null);
  },2500);

  return (
     <>
     <NoteState>
      <BrowserRouter>
        <Navbar />
        <Alert alert={alert} />
        <div className='container'>
        <Routes>
          <Route path="/" element={<Home showAlert={showAlert} />}></Route>
          <Route path="/about" element={<About/>}></Route>
          <Route path="/login" element={<Login showAlert={showAlert}/>}></Route>
          <Route path="/signup" element={<CreateUser showAlert={showAlert}/>}></Route>
        </Routes>
        </div>
      </BrowserRouter>
      </NoteState>
      
    </>
  );
}

export default App;
