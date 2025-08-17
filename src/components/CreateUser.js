import React,{ useState } from "react";
import {useNavigate} from 'react-router-dom';

const CreateUser = (props) => {
  const [credentials,setCredentials] = useState({name:"",email:"", password:"",cpassword:""})
  let navigate = useNavigate();
  const handleSubmit = async (e)=>{
    e.preventDefault();
        const {name,email,password} = credentials;
        const response = await fetch(`http://localhost:5000/api/auth/createuser`,{
        method: "POST",
        headers:{
          'Content-Type': 'application/json',
          //"authToken": localStorage.getItem('token')
        },
        body: JSON.stringify({name,email,password})
      });
      const json = await response.json();
      console.log(json);
      if(json.success){
        localStorage.setItem('token' , json.authToken);
        navigate("/");
        props.showAlert("Logged Inn Successfully","success")
      }
      else{
        props.showAlert("Invalid Credentials","danger")
      }

  }
  const onChange = (e)=>{
        setCredentials({...credentials,[e.target.name]: e.target.value})
    }
   return (
    <div className="container m-4">
      <form onSubmit={handleSubmit}>
        <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label">Name</label>
          <input type="text" class="form-control" id="name" name="name" aria-describedby="emailHelp" value={credentials.name} onChange={onChange} />
        </div>
        <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label">Email</label>
          <input type="email" class="form-control" id="email" name="email" aria-describedby="emailHelp" value={credentials.email} onChange={onChange} />
        </div>
        <div class="mb-3">
          <label for="exampleInputPassword1" class="form-label"> Password </label>
          <input type="password" class="form-control" id="password" name="password" value={credentials.password} onChange={onChange} required minLength={5}/>
        </div>
        <div class="mb-3">
          <label for="exampleInputPassword1" class="form-label">Confirm Password </label>
          <input type="password" class="form-control" id="cpassword" name="cpassword" value={credentials.cpassword} onChange={onChange} required minLength={5}/>
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default CreateUser;

