import './App.css';
import Navbar from './components/navbar';
import Footer from './components/footer';
import React, { useState } from "react";
import AuthContext from "./components/AuthContext";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Login from './components/Login';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';
import Income from './components/Income';
import Expense from './components/Expense';
import Transactions from './components/Transactions';
import ExpenseState from './context/exp/ExpState';
function App() {
  const [mode, setMode] = useState('light') //hooks
  // const [isAuthenticated, isUserAuthenticated] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [credentials, setCredentials] = useState({});

  const login = (credentials) => {
    setIsLoggedIn(true);
    setCredentials(credentials);
  };

  const logout = () => {
    setIsLoggedIn(false);
    setCredentials({});
  };

  const toggleMode = () => {   //function of toggling
    if (mode === 'light') {
      setMode("dark")
      document.body.style.backgroundColor = "#343a40"
      document.title = "Expense-DarkMode"
    }
    else {
      setMode("light")
      document.body.style.backgroundColor = "white"
      document.title = "Expense-LightMode"
    }
  }
  return (
    <>
      <ExpenseState>
        <Router>
          <AuthContext.Provider
            value={{
              isLoggedIn,
              credentials,
              login,
              logout,
            }}
          >
            <Navbar title="Expense_Mgmt" toggleMode={toggleMode} mode={mode} credentials={credentials}></Navbar>
            <div className="container5">
              <Routes>
                <Route exact path="/" element={<Login mode={mode} />} />
                <Route exact path="/signup" element={<Signup mode={mode} />} />
                <Route exact path="/dashboard" element={<Dashboard mode={mode} />} />
                <Route exact path='/income' element={<Income mode={mode} />} />
                <Route exact path='/expense' element={<Expense mode={mode} />} />
                <Route exact path='/transactions' element={<Transactions mode={mode} />} />
              </Routes>
            </div>
            <div className="foot">
              <Footer mode={mode}></Footer>
            </div>
          </AuthContext.Provider>
        </Router>
      </ExpenseState>
    </>
  );
}

export default App;
