import React, { useEffect, useState } from 'react';
import "../Savings/Savings.css";
import Axios from "axios";
import { Link  } from 'react-router-dom';
import { useGetUserID } from "../../Components/Hooks/UseGetUserID";
import { useCookies } from "react-cookie";
import { useAppContext }  from '../../Components/Context/AppContext';

const Savings = () => {

    const { AddSaving, AddTransaction } = useAppContext()
    const [Cookie, setCookie] = useCookies(["auth_token"]);

    const userID = useGetUserID();

    // USESTATE

    const [Transactions, setTransactions] = useState([])
    const [Savings, setSavings] = useState("")
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

    const AddSavings = (e) => {
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
                Axios.post("https://ebudget-server.onrender.com/Savings/AddSavings", data , {
                    headers: { authorization: Cookie.auth_token },
                }) 
                .then(() => { 
                    setFieldError("")
                    setSuccess("Savings/Investments has been succesffuly added.")
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

    // Calculation of Total Savings and Investments 

    const CalculateSavings = () => {
        let TotalSavings = 0;
        Transactions.forEach((Transaction) => {
            TotalSavings += parseInt(Transaction.Amount);
        });
        return TotalSavings;
    };

    // Delete Income Transaction

    const handleDelete= async(_id) => {
        await Axios.delete(`https://ebudget-server.onrender.com/Savings/${_id}`, {
            headers: {authorization: Cookie.auth_token}
        }) 
    }

    // USEEFFECT

    useEffect(() => {

    const FetchSavings = () => {
        Axios.get(`https://ebudget-server.onrender.com/Savings/${userID}/Savings`, {
        headers: { authorization: Cookie.auth_token },
        }) 
        .then((Response) => {
            setTransactions(Response.data)
        })
    } 

    if (userID) {
        FetchSavings()
    }

    },[Transactions])

    useEffect(()=> {
        const TotalSavings = CalculateSavings();
        setSavings(TotalSavings)
        AddSaving(TotalSavings) 
    },[Transactions])

return (
    <article className='Savings' >
        <section>
            <h1>Savings & Investment  </h1>
            <div>
                <h3>Total Savings & Investments : {Savings}</h3>
            </div>
        </section>
        <section>
            <form onSubmit={AddSavings}>
                <div>
                    <label htmlFor="">Savings/Investment Description</label>
                    <p>
                        <input type='text' placeholder='Savings/Investment Description' value={Description} onChange={DescriptionChange} />
                    </p>
                </div>
                <div>
                    <label htmlFor="">Savings/Investment Amount</label>
                    <p>
                        <input type="number" placeholder='Savings/Investment Amount' value={Amount} onChange={AmountChange} />
                    </p>
                </div>
                <div>
                    <label htmlFor="">Date</label>
                    <p>
                        <input type="date" placeholder='Enter the Date' value={Date} onChange={DateChange} />
                    </p>
                </div>
                <div>
                    <label htmlFor="">Memo</label>
                    <textarea type="text" name="" id="" cols="30" rows="5" placeholder='Add a Memo' value={Memo} onChange={MemoChange} ></textarea>
                </div>
                <span className='Error'>{FieldError}</span>
                <h4 className='Success'>{Sucess}</h4>
                <h4 className='Error'>{Error}</h4>
                <button onClick={AddSavings} type="submit">Add Savings/ Investment</button>
            </form>
            <div className='SavingsHistory'>
            {
            Transactions.map((Transaction) => (
            <li key={Transaction._id}>
                <i id='Icon' class="fa-solid fa-piggy-bank"></i>
                <div>
                    <section>
                        <h3>{Transaction.Description}</h3> 
                    </section>
                    <section>
                        <p> <i class="fa-solid fa-coins"></i> Kshs. {Transaction.Amount}</p>
                        <p> <i class="fa-solid fa-calendar-days"></i> Date: {Transaction.Date}</p>
                        {
                            Transaction.Memo ? <p id='Memo'><i class="fa-solid fa-comment"></i>{Transaction.Memo}</p> : ""
                        }
                    </section>
                </div>
                <Link to={`/Savings/${Transaction._id}`}>
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

export default Savings