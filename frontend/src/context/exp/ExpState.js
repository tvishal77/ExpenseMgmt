import React, { useState } from 'react'
import ExpContext from './ExpContext'

const ExpState = (props) => {
    const [expenses, setExpenses] = useState([]);
    const [incomes, setIncomes] = useState([]);

    //Income manupulations
    const addIncome = async (income) => {
        console.log("Adding an income")

        const response = await fetch(`http://localhost:5000/api/v1/add-income`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify(income)
        })
        const json = response.json();
        console.log(json)
        const addin = {
            "user": "64719ad62d608481ee49fe86",
            "title": income.title,
            "amount": income.amount,
            "type": "income",
            "date": income.date,
            "category": income.category,
            "description": income.description,
            "_id": "647def50c456489e555862e0",
            "createdAt": "2023-06-05T14:21:04.712Z",
            "updatedAt": "2023-06-05T14:21:04.712Z",
            "__v": 0
        }
        setIncomes(addin)
        alert("Income added Successfully")
        getIncome();

    }

    const getIncome = async () => {
        const response = await fetch(`http://localhost:5000/api/v1/get-incomes`, {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
        })
        const json = await response.json()
        console.log(json)
        setIncomes(json)
        totalIncome();

    }

    const deleteIncome = async (id) => {
        const response = await fetch(`http://localhost:5000/api/v1/delete-income/${id}`, {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json',
                'auth-token': localStorage.getItem('token')
            }
        })
        const json = response.json();
        console.log(json)

        console.log(id)
        const newincome = incomes.filter((income) => { return income._id !== id })
        setIncomes(newincome)
        alert("Income Deleted Successfully")
        getIncome()
    }

    const [total, setTotal] = useState(0)
    const totalIncome = async () => {
        const response = await fetch(`http://localhost:5000/api/v1/get-incomes`, {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
        })
        const json = await response.json()
        console.log(json)
        const x = json.reduce((sum, income) => sum + income.amount, 0);
        // console.log(x);
        setTotal(x);
        getAvailable();
        return x
    };

    //Expense Manupulations
    const addExpense = async (expense) => {
        const response = await fetch(`http://localhost:5000/api/v1/add-expense`, {
            method: "POST",
            headers: {
                'content-type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify(expense)
        })
        const json = await response.json()
        console.log(json)

        const addexp = {
            "user": "64719ad62d608481ee49fe86",
            "title": expense.title,
            "amount": expense.amount,
            "type": "income",
            "date": expense.date,
            "category": expense.category,
            "description": expense.description,
            "_id": "647def50c456489e555862e0",
            "createdAt": "2023-06-05T14:21:04.712Z",
            "updatedAt": "2023-06-05T14:21:04.712Z",
            "__v": 0
        }
        setExpenses(addexp);
        alert("Expense Added successfully")
        getExpense();
    }

    const getExpense = async () => {
        const response = await fetch(`http://localhost:5000/api/v1//get-expenses`, {
            method: "GET",
            headers: {
                'content-type': 'application/json',
                'auth-token': localStorage.getItem('token')
            }
        })
        const json = await response.json()
        console.log(json)
        setExpenses(json)
        totalExpense();

    }

    const deleteExpense = async (id) => {
        const response = await fetch(`http://localhost:5000/api/v1/delete-expense/${id}`, {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json',
                'auth-token': localStorage.getItem('token')
            }
        })
        const json = response.json();
        console.log(json)

        console.log(id)
        const newexpense = expenses.filter((expense) => { return expense._id !== id })
        setExpenses(newexpense)
        alert("Expense Deleted Successfully")
        getExpense()
    }

    const [exptotal, setExptotal] = useState(0)
    const totalExpense = async () => {
        const response = await fetch(`http://localhost:5000/api/v1//get-expenses`, {
            method: "GET",
            headers: {
                'content-type': 'application/json',
                'auth-token': localStorage.getItem('token')
            }
        })
        const json = await response.json()
        console.log(json)
        const x = json.reduce((sum, expense) => sum + expense.amount, 0);
        // console.log(x)
        setExptotal(x);
        getAvailable();
        return x;
    }

    const [available, setAvailable] = useState(0)
    const getAvailable = async () => {
        const inc = await totalIncome();
        const exp = await totalExpense();
        console.log(inc)
        console.log(exp)
        const sol = inc - exp;
        console.log(sol)
        setAvailable(sol)
    }
    return (
        <ExpContext.Provider value={{ getAvailable, available, deleteExpense, getExpense, addExpense, totalIncome, total, incomes, deleteIncome, addIncome, getIncome, exptotal, expenses, totalExpense }}>
            {props.children}
        </ExpContext.Provider>
    )
}

export default ExpState
