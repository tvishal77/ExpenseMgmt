import React, { useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import Form from './Form';
import styled from 'styled-components'
import ExpContext from '../context/exp/ExpContext';
import IncomeItem from './Incomeitem';
function Income(props) {
    const context = useContext(ExpContext)
    const { addIncome, incomes, getIncome, deleteIncome, total } = context;
    const history = useNavigate();
    useEffect(() => {
        if (localStorage.getItem('token')) {
            getIncome();
            history("/income");

        }
        else {
            history("/");
        }
    }, [])
    return (
        <IncomeStyled>
            <div class="container-fluid">
                <h1 className={`heading text-${props.mode === 'light' ? '' : 'light'}`}>Income Section</h1>
                <div class="row">
                    <div class="setcol col-md-4">
                        <h2 className={`total-income bg-${props.mode} text-${props.mode === 'light' ? '' : 'light'}`}>Total Income: <span>${total}</span> </h2>
                        <Form />
                    </div>
                    <div class="col">
                        <h2 className={`total-income bg-${props.mode} text-${props.mode === 'light' ? '' : 'light'}`}>Analize Your Incomes</h2>
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
                            <h1>Don't have Incomes:( </h1>
                        )
                        }
                    </div>
                </div>


            </div>

        </IncomeStyled>
    )
}
const IncomeStyled = styled.div`
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
            color:green;
        }
    }
    h1.heading{
        color: rgb(9, 210, 19);
        font-style: italic;
        font-weight: 800;
        padding: 0.45vh;
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
export default Income
