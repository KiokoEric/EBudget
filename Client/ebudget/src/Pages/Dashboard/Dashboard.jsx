import React , { useEffect, useState } from 'react';
import "../Dashboard/Dashboard.css";
import Axios from "axios";
import { GiPayMoney } from "react-icons/gi"
import { useCookies } from "react-cookie";
import ChartImage from '../../Components/ChartImage/ChartImage';
import { useGetUserID } from "../../Components/Hooks/UseGetUserID";
import Labels from '../../Components/Labels/Labels';

const Dashboard = () => {

    const [Cookie, setCookie] = useCookies(["auth_token"]);
    const userID = useGetUserID();

    // USESTATE

    const [ TotalIncome, setTotalIncome ] = useState("")
    const [ TotalExpenses, setTotalExpenses ] = useState("")
    const [ TotalSavings, setTotalSavings ] = useState("")
    const [IncomeTransactions, setIncomeTransactions] = useState([])
    const [ExpenseTransactions, setExpenseTransactions] = useState([])

    // TotalIncomes, TotalExpenses and TotalSavings

    useEffect(() => {

        const FetchTotalIncomes = async() => {
            await Axios.get(`https://ebudget-server.onrender.com/Income/${userID}/TotalIncomes`, {
            headers: { authorization: Cookie.auth_token },
            }) 
            .then((Response) => {
                setTotalIncome(Response.data.TotalAmount)
            })
        }

        const FetchTotalExpenses = async() => {
            await Axios.get(`https://ebudget-server.onrender.com/Expense/${userID}/TotalExpenses`, {
            headers: { authorization: Cookie.auth_token },
            }) 
            .then((Response) => {
                setTotalExpenses(Response.data.TotalAmount)
            })
        }

        const FetchTotalSavings = async() => {
            await Axios.get(`https://ebudget-server.onrender.com/Savings/${userID}/TotalSavings`, {
            headers: { authorization: Cookie.auth_token },
            }) 
            .then((Response) => {
                setTotalSavings(Response.data.TotalAmount)
            })
        }

        FetchTotalIncomes()

        FetchTotalExpenses()

        FetchTotalSavings()

    }, [userID])

    // Income and Savings Transaction

    useEffect(() => {

        const FetchIncome = async() => {
            await Axios.get(`https://ebudget-server.onrender.com/Income/${userID}/Incomes`, {
            headers: { authorization: Cookie.auth_token },
            }) 
            .then((Response) => {
                setIncomeTransactions(Response.data)
            })
        } 

        const FetchExpenses = () => {
            Axios.get(`https://ebudget-server.onrender.com/Expense/${userID}/Expenses`, {
            headers: { authorization: Cookie.auth_token },
            }) 
            .then((Response) => {
                setExpenseTransactions(Response.data)
            })
        }
    
        if (userID) {
            FetchIncome()
            FetchExpenses()
        } 

    },[])

return (
    <div className='Dashboard'>
        <section className='Display'>
            <div>
                <h1>Total Income</h1>
                <h2>Kshs. {TotalIncome} </h2>
            </div>
            <div>
                <h1>Total Expense</h1>
                <h2>Kshs. {TotalExpenses} </h2>
            </div>
            <div>
                <h1>Savings & Investments</h1>
                <h2>Kshs. {TotalSavings}</h2>
            </div> 
            <div>
                <h1>Total Balance</h1>
                <h2>Kshs. {TotalIncome - TotalExpenses - TotalSavings}</h2>
            </div> 
        </section>
        <div>
            <article className='ChartImage'>
                <div>
                    <h2>Transaction Summary</h2>
                </div>
                <figure>
                    <ChartImage />
                    <Labels />
                </figure>
            </article>
            <section className='History'>
                <h2>Recent Transaction History</h2>
                <h3>Income Transactions</h3>
                <article> 
                {
                    IncomeTransactions.map((Transaction) => (
                    <li key={Transaction._id}>
                        <i id='Icon' class="fa-solid fa-money-bill-wheat"></i>
                        <div>
                            <section>
                                <h3>{Transaction.Description}</h3> 
                            </section>
                            <section>
                                <p> <i class="fa-solid fa-coins"></i> Kshs. {Transaction.Amount}</p>
                                <p> <i class="fa-solid fa-calendar-days"></i> Date: {Transaction.Date}</p>
                                {
                                    Transaction.Memo ? <p id='Memo' > <i class="fa-solid fa-comment"></i> {Transaction.Memo}</p> : ""
                                }
                            </section>
                        </div>
                    </li>
                    ))
                }
                </article>
                    <h3>Expense Transactions</h3>
                <article>
                {
                    ExpenseTransactions.map((Transaction) => (
                    <li key={Transaction._id} >
                        <GiPayMoney size="3rem" id="Icon" />
                        <div>
                            <section>
                                <h3>{Transaction.Description}</h3> 
                            </section>
                            <section>
                                <p> <i class="fa-solid fa-coins"></i> Kshs. {Transaction.Amount}</p>
                                <p> <i class="fa-solid fa-calendar-days"></i> Date: {Transaction.Date}</p>
                                {
                                    Transaction.Memo ? <p id='Memo' > <i class="fa-solid fa-comment"></i> {Transaction.Memo}</p> : ""
                                }
                            </section>
                        </div>
                    </li>
                    ))
                }
                </article>
            </section>
        </div>
    </div>
)
}

export default Dashboard