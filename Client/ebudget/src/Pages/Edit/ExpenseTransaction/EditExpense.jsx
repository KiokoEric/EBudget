import React, { useEffect, useState } from 'react';
import Axios from "axios";
import { useGetUserID } from "../../../Components/Hooks/UseGetUserID";
import { useCookies } from "react-cookie";
import { useParams } from 'react-router-dom';

const EditExpense = () => {

    const [Cookie, setCookie] = useCookies(["auth_token"]);
    const userID = useGetUserID();

     // USESTATE

    const [Description, setDescription] = useState("")
    const [Amount, setAmount] = useState("")
    const [Memo, setMemo] = useState("")
    const [Date, setDate] = useState("")
    const [userOwner, setuserOwner] = useState(userID)
    const [Sucess, setSuccess] = useState("") 
    const { _id } = useParams()

    useEffect(() => {

        const FetchExpense =() => {
        try{
            Axios.get(`https://ebudget-server.onrender.com/Expense/${_id}`, {
            headers: { authorization: Cookie.auth_token },
            }) 
            .then((Data) => { 
                setDescription(Data.data.Description)
                setAmount(Data.data.Amount)
                setMemo(Data.data.Memo)
                setDate(Data.data.Date) 
            })
        }
        catch (Error){
            console.log("")
        }
        }

        FetchExpense()
        
    }, [])


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

    const EditTransaction = (e) => {
        e.preventDefault()

        const data = {
            Description, Amount, Memo, Date, userOwner
        }
        try {
            Axios.put(`https://ebudget-server.onrender.com/Expense/${_id}`, data , {
                headers: { authorization: Cookie.auth_token },
            }) 
            .then(() => { 
                setSuccess("Expense Transaction has been succesffuly edited.")
            })
        } catch (error) {
            console.error(error) 
        }
    } 

return (
    <article className='Edit'>
        <section>
            <h1>Edit Expense Transaction</h1>
        </section>
        <section> 
            <form onSubmit={EditTransaction}>
                <i id='EditIcon' class="fa-solid fa-file-pen"></i>
                <div>
                    <label htmlFor="">Expense Description</label>
                    <p>
                        <input type='text' placeholder='Expense Description' value={Description} onChange={DescriptionChange} />
                    </p>
                </div>
                <div>
                    <label htmlFor="">Expense Amount</label>
                    <p>
                        <input type="number" placeholder='Expense Amount' value={Amount} onChange={AmountChange} />
                    </p>
                </div>
                <div>
                    <label htmlFor="">Date</label>
                    <p>
                        <input type="date" placeholder='Date' value={Date} onChange={DateChange} />
                    </p>
                </div>
                <div>
                    <label htmlFor="">Memo</label>
                    <textarea type="text" name="" id="" cols="30" rows="5" placeholder='Memo' value={Memo} onChange={MemoChange} ></textarea>
                </div>
                <h4 className='Success'>{Sucess}</h4>
                <button onClick={EditTransaction} type="submit">Edit Transaction</button>
            </form>
        </section>
    </article>
)
}

export default EditExpense