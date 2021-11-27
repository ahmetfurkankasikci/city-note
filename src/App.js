import React,{useState}from 'react'
import Form from './Form'
import Box from './Box'
import './Style.css';
function App() {
  const [isForm,setIsForm]=useState(true)
  return (
    <div>
      <div style={{display: 'flex',justifyContent: 'center',alignItems: 'center',marginTop:10}}>
      
        <button href="#" className="btn-primary" onClick={()=>setIsForm(true)}>Formu aç</button>
        <button href="#" className="btn-secondary" onClick={()=>setIsForm(false)}>Nota Bak</button>
      </div>

      {isForm ? <Form/>:<Box/>}

    </div>
  )
}

export default App
