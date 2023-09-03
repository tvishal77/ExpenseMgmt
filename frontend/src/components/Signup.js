import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
// import "./Signup.css";
import tt from "./exp.png"

export default function Signup(props) {
  const [credentials, setCredentials] = useState({ name: "", email: "", password: "" })
  const history = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = credentials;
    const response = await fetch("http://localhost:5000/api/auth/createuser", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, email, password })
    });
    const json = await response.json()
    console.log(json);
    if (json.success) {
      // Save the auth token and redirect
      localStorage.setItem('token', json.authtoken);
      history("/");
      alert("Registration Successful!!");

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
      <h1 className={`text-${props.mode === "light" ? "rgb(43, 45, 106)" : "white"}`}>SignUp</h1>
      <div className="container">
        <form action="POST" className="my-3" onSubmit={handleSubmit} >
          <div class="row mb-3">
            {/* <label for="inputEmail3" class="col-sm-2 col-form-label">Email</label> */}
            <div class="col-sm-5">
              <input type="text" id="name" name='name' onChange={onChange} class="form-control" placeholder="Username" />
            </div>
          </div>
          <div class="row mb-3">
            {/* <label for="inputEmail3" class="col-sm-2 col-form-label">Email</label> */}
            <div class="col-sm-5">
              <input type="email" id="email" name='email' onChange={onChange} class="form-control" placeholder="Email" />
            </div>
          </div>
          <div class="row mb-3">
            {/* <label for="inputPassword3" class="col-sm-2 col-form-label">Password</label> */}
            <div class="col-sm-5">
              <input type="password" id="password" name='password' class="form-control" onChange={onChange} placeholder="Password" />
            </div>
          </div>
          <div>
            <input type="submit" class="btn btn-primary mx-2 my-2" />
            <Link to="/" class="btn btn-primary ">Click here to Login</Link>
          </div>
        </form>
      </div>
    </>
  );
}
