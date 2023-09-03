import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import ExpContext from '../context/exp/ExpContext';
import Chart from './Chart.js';
function Dashboard(props) {
    const context = useContext(ExpContext);
    const { incomes, expenses, getAvailable, available, getExpense, getIncome, total, exptotal } = context;
    const history = useNavigate();
    useEffect(() => {
        if (localStorage.getItem('token')) {
            getExpense();
            getIncome();
            getAvailable();
            history("/dashboard")
        }
        else {
            history("/")
        }
    }, [])
    return (
        <DashboardStyled>
            <div class="container-fluid">
                <h1 className={`heading text-${props.mode === 'light' ? '' : 'light'}`}>Dashboard</h1>
                <div class="row">

                    <div class="col">
                        <h2 className={`total-income bg-${props.mode} text-${props.mode === 'light' ? '' : 'light'}`}>Budget Graph</h2>
                        <div className="container">
                            <Chart />
                        </div>

                    </div>
                    <div class="setcol col-md-4 mx-4">
                        <div className="history-con">
                            <h2 className={`salary-title1 text-${props.mode === 'light' ? '' : 'light'}`}>Min <span>Salary</span>Max</h2>
                            <div className={`salary-item bg-${props.mode} text-${props.mode === 'light' ? '' : 'light'}`}>

                                <p>
                                    ${Math.min(...incomes.map(item => item.amount))}
                                </p>
                                <p>
                                    ${Math.max(...incomes.map(item => item.amount))}
                                </p>
                            </div>
                            <h2 className={`salary-title text-${props.mode === 'light' ? '' : 'light'}`}>Min <span >Expense</span>Max</h2>
                            <div className={`salary-item bg-${props.mode} text-${props.mode === 'light' ? '' : 'light'}`}>

                                <p>
                                    ${Math.min(...expenses.map(item => item.amount))}
                                </p>
                                <p>
                                    ${Math.max(...expenses.map(item => item.amount))}
                                </p>
                            </div>
                        </div>
                        <h2 className={`total-incomes mt-4 bg-${props.mode} text-${props.mode === 'light' ? '' : 'light'}`}>Total Expense: <span>${exptotal}</span></h2>
                        <h2 className={`total-income my-1  bg-${props.mode} text-${props.mode === 'light' ? '' : 'light'}`}>Total Income: <span> ${total}</span></h2>
                        <h2 className={`total-incomee  bg-${props.mode} text-${props.mode === 'light' ? '' : 'light'}`}>Available Balance: <span>${available}</span></h2>

                    </div>
                </div>
            </div>

        </DashboardStyled >
    )
}

const DashboardStyled = styled.div`
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
        font-style:italic;
        span{
            font-size: 2rem;
            font-weight:500;
            color: green;
        }
    }
    .total-incomee{
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
        font-style:italic;
        span{
            font-size: 2rem;
            font-weight:500;
            color: chocolate;
        }
    }
    h1.heading{
        color: rgb(32, 176, 152);
        font-style: italic;
        font-weight: 800;
        padding: 0.45vh;
        border-radius: 5vh;
        border-bottom: 3px solid brown ;
        font-family:'Times New Roman', Times, serif
        
    }
    .total-incomes{
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
        font-style:italic;
        span{
            font-size: 2rem;
            font-weight:500;
            color: red;
        }
    }

    .income-content{
        display: flex;
        gap: 2rem;
        .incomes{
            flex: 1;
        }
    }
    .history-con{
        grid-column: 4 / -1;
        h2{
            margin: 1rem 0;
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
        .salary-title1{
            font-size: 1.2rem;
            color:goldenrod;
            font-style:italic;
            span{
                font-size: 1.8rem;
            }
        }
        .salary-title{
            font-size: 1.2rem;
            color:crimson;
            font-style:italic;
            span{
                font-size: 1.8rem;
            }
        }
        .salary-item{
            background: #FCF6F9;
            border: 2px solid #FFFFFF;
            box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
            padding: 1rem;
            border-radius: 20px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            p{
                font-weight: 600;
                font-size: 1.6rem;
            }
        }
    }
`;
export default Dashboard
