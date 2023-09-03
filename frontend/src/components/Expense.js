import React, { useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import ExpContext from '../context/exp/ExpContext';
import ExpForm from './ExpForm';
import Expenseitem from './Expenseitem';
import styled from 'styled-components'

function Expense(props) {
    const context = useContext(ExpContext)
    const { addExpense, expenses, getExpense, deleteExpense, exptotal } = context;
    const history = useNavigate();
    useEffect(() => {
        if (localStorage.getItem('token')) {
            getExpense();
            history("/expense")
        }
        else {
            history("/")
        }
    }, [])
    return (
        <ExpenseStyled>
            <div class="container-fluid">
                <h1 className={`heading text-${props.mode === 'light' ? '' : 'light'}`}>Expense Section</h1>
                <div class="row">
                    <div class="setcol col-md-4">
                        <h2 className={`total-income bg-${props.mode} text-${props.mode === 'light' ? '' : 'light'}`}>Total Expense: <span>${exptotal}</span> </h2>
                        <ExpForm />
                    </div>
                    <div class="col">
                        <h2 className={`total-income bg-${props.mode} text-${props.mode === 'light' ? '' : 'light'}`}>Analize Your Expense</h2>
                        {expenses.length > 0 ? (expenses.map((expense) => {
                            const { _id, title, amount, date, category, description, type } = expense;
                            return <Expenseitem
                                key={_id}
                                id={_id}
                                title={title}
                                description={description}
                                amount={amount}
                                date={date}
                                type={type}
                                category={category}
                                indicatorColor="var(--color-green)"
                                deleteItem={deleteExpense}
                            />
                        })) : (
                            <h1>Don't have Expenses:) </h1>
                        )
                        }
                    </div>
                </div>


            </div>

        </ExpenseStyled>
    )
}
const ExpenseStyled = styled.div`
    display: flex;
    overflow: auto;
    .total-income{
        display: flex;
        justify-content: center;
        align-items: left;
        background: #FCF6F9;
        border: 2px solid #FFFFFF;
        box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
        border-radius: 20px;
        padding: 1rem;
        margin: 1rem 0;
        font-size: 2rem;
        gap: .5rem;
        span{
            font-size: 2rem;
            font-weight:500;
            color:red;
        }
    }
    h1.heading{
        color:#f92e23;
        font-style: italic;
        font-weight: 800;
        padding: 0.45vh;
        border-radius: 5vh;
        border-bottom: 3px solid brown ;
        font-family:'Times New Roman', Times, serif
        
    }
    h1{
        color:#68f118;
        text-align: center;
        font-style:italic;
    }

    .income-content{
        display: flex;
        gap: 2rem;
        .incomes{
            flex: 1;
        }
    }
`;
export default Expense
