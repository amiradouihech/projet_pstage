import React, { useState } from 'react';
import axios from 'axios';
function Login() {
    const [values,setValues]=useState({
      name:'',
      email:'',
      password:''
    })
    const handleChange=(event)=>{
      setValues({...values,[event.target.name]:[event.target.value]})
    }
    const handleSubmit=(event)=>{
      event.preventDefault();
      axios.post('http://localhost:4000/signup',values).then(res=>console.log("Registered Sucessfully !!"))
      .catch(err=>console.log(err));
    }
    return(
        <div >
    <h1>connection</h1>
    <form onSubmit={handleSubmit}>
    <label htmlFor="text" className="form-label">
            name
          </label>
    <input type="text" name="name" className='form-control' id="text" onChange={handleChange}/>
    <label htmlFor="email" className="form-label">
            email
          </label>
    <input type="email" name="email" className='form-control' id="email" onChange={handleChange}/>
    <label htmlFor="password" className="form-label">
            password
          </label>
    <input type="password" name="password" className='form-control' id="password"onChange={handleChange} />
    <button type="submit" className="">Sign up</button>
    </form></div>);
    
}
export default Login;