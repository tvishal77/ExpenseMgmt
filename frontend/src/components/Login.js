import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from "react-router-dom";
import './Login.css'
import AuthContext from "./AuthContext";
import tt from './exp.png';


export default function Login(props) {
  const [credentials, setCredentials] = useState({ email: "", password: "" })
  const history = useNavigate()
  const { login } = useContext(AuthContext);


  const handleSubmit = async (e) => {

    e.preventDefault();

    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: credentials.email, password: credentials.password })
    });
    const json = await response.json()
    console.log(json);
    if (json.success) {
      // Save the auth token and redirect
      localStorage.setItem('token', json.authtoken);
      alert(`${credentials.email} has been logged in`);
      login(credentials);
      history('/dashboard');
    }
    else {
      alert("Invalid credentials");
    }
  }

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }

  return (
    <>
      <h1 className="my-3"><img src={tt} alt="Loading" width={`125`} height={`125`} /></h1>
      <h1 className={`text-${props.mode === "light" ? "rgb(43, 45, 106)" : "white"}`}>Login</h1>
      <div className="container">
        <form action="POST" className="my-3" onSubmit={handleSubmit}>
          <div class={`row mb-3 text-${props.mode === 'light' ? 'dark' : 'light'}`}>
            {/* <label for="inputEmail3" class="col-sm-2 col-form-label">Email</label> */}
            <div class="col-sm-5">
              <input type="email" id='email' value={credentials.email} name='email' onChange={onChange} class="form-control" placeholder="Email" />
            </div>
          </div>

          <div class="row mb-3">
            {/* <label for="inputPassword3" class="col-sm-2 col-form-label">Password</label> */}
            <div class="col-sm-5">
              <input type="password" id='password' name='password' value={credentials.password} class="form-control" onChange={onChange} placeholder="Password" />
            </div>
          </div>
          <div>
            <input type="submit" class="btn btn-primary mx-2 my-2" />
            <Link to="/signup" class="btn btn-primary bg-chocolate">Click here to SignUp</Link>
          </div>
        </form>
      </div>
    </>
  )
}
