import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import ExpContext from '../context/exp/ExpContext';
import IncomeItem from './Incomeitem';
import Expenseitem from './Expenseitem';

function Transactions(props) {
    const context = useContext(ExpContext)
    const { getAvailable, available, expenses, getExpense, deleteExpense, getIncome, incomes, deleteIncome } = context
    const history = useNavigate();
    useEffect(() => {
        if (localStorage.getItem('token')) {
            getAvailable();
            getIncome();
            getExpense();
            history("/transactions")
        }
        else {
            history("/")
        }
    }, [])
    return (
        <TransactionStyled>
            <div class="container-fluid">
                <h1 className={`heading text-${props.mode === 'light' ? '' : 'light'}`}>Available Balance: <span>${available}</span></h1>
                <div class="row">
                    <div class="col">
                        <h2 className={`total-income bg-${props.mode} text-${props.mode === 'light' ? '' : 'light'}`}>Income History</h2>
                        {incomes.length > 0 ? (incomes.map((income) => {
                            const { _id, title, amount, date, category, description, type } = income;
                            return <IncomeItem
                                key={_id}
                                id={_id}
                                title={title}
                                description={description}
                                amount={amount}
                                date={date}
                                type={type}
                                category={category}
                                indicatorColor="var(--color-green)"
                                deleteItem={deleteIncome}
                            />
                        })) : (
                            <h1>Don't Have Incomes :( </h1>
                        )
                        }
                    </div>
                    <div class="col">
                        <h2 className={`total-income bg-${props.mode} text-${props.mode === 'light' ? '' : 'light'}`}>Expense History</h2>
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
                                mode={props.mode}
                            />
                        })) : (
                            <h1>Don't have Expenses :) </h1>
                        )
                        }
                    </div>

                </div>


            </div>
        </TransactionStyled>
    )
}
const TransactionStyled = styled.div`
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
            font-size: 2.5rem;
            color:green;
            font-weight:500;
        }
    }
    h1{
        color:rgb(32, 164, 164);
        text-align: center;
        font-style:italic;
    }
    .heading{
        color: #db620d;
        padding: 0.45vh;
        font-weight:800;
        border-radius: 5vh;
        border-bottom: 3px solid brown ;
        font-family:'Times New Roman', Times, serif
        
    }

    .income-content{
        display: flex;
        gap: 2rem;
        .incomes{
            flex: 1;
        }
    }
`;
export default Transactions
