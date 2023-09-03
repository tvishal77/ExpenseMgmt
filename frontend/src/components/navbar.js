import React from "react";
import { Link, useNavigate } from "react-router-dom";
import tt from "./exp.png"

export default function Navbar(props) {
  const history = useNavigate();
  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem('token');
    history("/");
  }

  return (
    <>
      <nav className={`navbar navbar-expand-lg navbar-${props.mode} bg-${props.mode}`}>
        <div className="container-fluid">
          <Link className="navbar-brand mx-2" to="https://www.linkedin.com/in/thrambadia-vishal"><img src={tt} alt="" height={30} width={30} /></Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <Link class={`nav-link active`} aria-current="page" to="/dashboard">Dashboard</Link>
              </li>
              <li class="nav-item">
                <Link class={`nav-link active`} aria-current="page" to="/income">Income</Link>
              </li>
              <li class="nav-item">
                <Link class={`nav-link active`} aria-current="page" to="/expense">Expense</Link>
              </li>
              <li class="nav-item">
                <Link class={`nav-link active`} aria-current="page" to="/transactions">transactions</Link>
              </li>
            </ul>
            {!localStorage.getItem('token') ? <form className="d-flex">
              <Link className="btn btn-primary mx-1" to="/" role="button">Login</Link>
              <Link className="btn btn-primary mx-1" to="/signup" role="button">Signup</Link>
            </form> : <div class="dropdown">
              <a class="btn btn-secondary dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                {props.credentials.email}
              </a>

              <ul class="dropdown-menu dropdown-menu-dark">
                <li><Link onClick={handleLogout} className="dropdown-item">Logout</Link></li>
              </ul>
            </div>}


            <div className={`form-check form-switch text-${props.mode === 'light' ? 'dark' : 'light'} mx-2 my-2`}>


              <input className="form-check-input" onClick={props.toggleMode} type="checkbox" role="switch" id="flexSwitchCheckDefault" />
              <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Enable Dark</label>
            </div>

          </div>
        </div>
      </nav >
    </>
  )
}
