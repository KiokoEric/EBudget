import React, { useEffect, useState } from 'react';
import Axios from "axios";
import { v4 as uuidv4 } from 'uuid';
import { useAppContext }  from '../../Components/Context/AppContext';
import { useGetUserID } from "../../Components/Hooks/UseGetUserID";
import { useCookies } from "react-cookie";
import { GiPayMoney } from "react-icons/gi";
import { Link  } from 'react-router-dom';
import "../Expenses/Expenses.css";


const Expenses = () => {

    const { AddExpenses } = useAppContext()
    const [Cookie, setCookie] = useCookies(["auth_token"]);

    const userID = useGetUserID();

    // USESTATE

    const [Transactions, setTransactions] = useState([])
    const [Expenses, setExpenses] = useState("")
    const [Description, setDescription] = useState("")
    const [Amount, setAmount] = useState("")
    const [Memo, setMemo] = useState("")
    const [Date, setDate] = useState("")
    const [userOwner, setuserOwner] = useState(userID)
    const [FieldError, setFieldError] = useState("")
    const [Error, setError] = useState("")
    const [Sucess, setSuccess] = useState("")

    // HandleChanges : OnChange

    const DescriptionChange = (e) => {
        setDescription(e.target.value)
    }

    const AmountChange = (e) => {
        setAmount(e.target.value)
    }

    const MemoChange = (e) => {
        setMemo(e.target.value)
    }

    const DateChange = (e) => {
        setDate(e.target.value)
    }


    // Transaction Array

    const AddExpense = (e) => {
        e.preventDefault()

        // UserID Identification

        if (!userID) {
            setError('Kindly log in!') 
        }

        // Addition of Input Values

        if (Description === "") {
            setSuccess("")
            setFieldError("Description, Amount and Date Fileds are required!")
        } else if (Amount === "") {
            setSuccess("")
            setFieldError("Description, Amount and Date Fileds are required!")
        } else if (Date === "") {
            setSuccess("")
            setFieldError("Description, Amount and Date Fileds are required!")
        } else {
            const data = {
                Description, Amount, Memo, Date, userOwner
            }
            try {
                Axios.post("https://ebudget-server.onrender.com/Expense/AddExpense", data , {
                    headers: { authorization: Cookie.auth_token },
                }) 
                .then(() => { 
                    setFieldError("")
                    setSuccess("Expense has been successfully added.")
                    setDescription("")
                    setAmount("")
                    setDate("") 
                    setMemo("")
                })
            } catch (error) {
                console.error(error) 
            }
        }
    } 


    // Delete Expense Transaction

    const handleDelete= (_id) => {
        Axios.delete(`https://ebudget-server.onrender.com/Expense/${_id}`, {
            headers: { authorization: Cookie.auth_token }
        }) 
    }

    // USE EFFECT

    useEffect(() => {

        const FetchExpenses = () => {
            Axios.get(`https://ebudget-server.onrender.com/Expense/${userID}/Expenses`, {
            headers: { authorization: Cookie.auth_token },
            }) 
            .then((Response) => {
                setTransactions(Response.data)
            })
        }

        if (userID) {
            FetchExpenses()
        }
    },[Transactions])

    // Calculation of Total Expense

    const CalculateExpense = () => {
        let TotalExpense = 0;
        Transactions.forEach((Transaction) => {
            TotalExpense += parseInt(Transaction.Amount);
        });
        return TotalExpense;
    };


    useEffect(()=> {
        const TotalExpense = CalculateExpense();
        setExpenses(TotalExpense);
        AddExpenses(TotalExpense)
    },[Transactions]) 

return (
    <article className='Expense' >
        <section>
            <h1>Expenses</h1>
            <div>
                <h3>Total Expense: <span>Kshs.{parseInt(Expenses)}</span></h3>
            </div>
        </section>
        <section>
            <form onSubmit={AddExpense}>
                <div>
                    <label htmlFor="">Expense Description</label>
                    <p>
                        <input type='text' placeholder='Expense Description' value={Description} onChange={DescriptionChange} required />
                    </p>
                </div>
                <div>
                    <label htmlFor="">Expense Amount</label>
                    <p>
                        <input type='number' placeholder='Expense Amount' value={Amount} onChange={AmountChange} required />
                    </p>
                </div>
                <div>
                    <label htmlFor="">Date</label>
                    <p>
                        <input type="date" placeholder='Enter the Date' value={Date} onChange={DateChange}  name="" id="" />
                    </p>
                </div>
                <div>
                    <label htmlFor="Memo">Memo</label>
                    <textarea type="text" name="" id="" cols="30" rows="5" placeholder='Add a Memo' value={Memo} onChange={MemoChange} ></textarea>
                </div>
                <span className='Error'>{FieldError}</span>
                <h4 className='Success'>{Sucess}</h4>
                <h4 className='Error' >{Error}</h4>
                <button onClick={AddExpense} type="submit">Add Expense</button>
            </form>
            <div className='ExpenseHistory'>
            {
                Transactions.map((Transaction) => (
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
                                Transaction.Memo ? <p id='Memo'> <i class="fa-solid fa-comment"></i> {Transaction.Memo}</p> : ""
                            }
                        </section>
                    </div>
                    <Link to={`/Expense/${Transaction._id}`} >
                        <i id='Edit' class="fa-solid fa-pen-to-square"></i>
                    </Link>
                    <i onClick={() => handleDelete(Transaction._id)} id='Delete' class="fa-solid fa-trash"></i>
                </li>
                ))
            }
            </div>
        </section>
    </article> 
)
}

export default Expenses