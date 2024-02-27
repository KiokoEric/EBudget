import React, { useEffect, useState } from 'react';
import Axios from "axios";
import { useGetUserID } from "../../../Components/Hooks/UseGetUserID";
import { useCookies } from "react-cookie";
import { useParams } from 'react-router-dom';

const EditSavings = () => {

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

        const FetchSavings =() => {
        try{
            Axios.get(`https://ebudget-server.onrender.com/Savings/${_id}`, {
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

        FetchSavings()
        
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
            Axios.put(`https://ebudget-server.onrender.com/Savings/${_id}`, data , {
                headers: { authorization: Cookie.auth_token },
            }) 
            .then(() => { 
                setSuccess("Savings Transaction has been succesffuly edited.")
            })
        } catch (error) {
            console.error(error) 
        }
    } 

return (
    <article className='Edit'>
        <section>
            <h1>Edit Savings and Investment Transaction</h1>
        </section>
        <section>
            <form onSubmit={EditTransaction}>
                <i id='EditIcon' class="fa-solid fa-file-pen"></i>
                <div>
                    <label htmlFor="">Savings/Investment Description</label>
                    <p>
                        <input type='text' value={Description} onChange={DescriptionChange} />
                    </p>
                </div>
                <div>
                    <label htmlFor="">Savings/Investment Amount</label>
                    <p>
                        <input type="number" value={Amount} onChange={AmountChange} />
                    </p>
                </div>
                <div>
                    <label htmlFor="">Date</label>
                    <p>
                        <input type="date" value={Date} onChange={DateChange} />
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

export default EditSavings