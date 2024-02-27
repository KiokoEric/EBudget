import React from 'react';
import Axios from "axios";
import "../DeleteProfile/DeleteProfile.css";
import { useGetUserID } from "../../../Components/Hooks/UseGetUserID";
import { useCookies } from "react-cookie";
import {useNavigate} from "react-router-dom";

const DeleteProfile = () => {

    const [ Cookie, setCookie ] = useCookies(["auth_token"]);  

    const myID = useGetUserID();
    const navigate = useNavigate()

    const DeleteUser = (id) => {
        try{
            Axios.delete(`https://ebudget-server.onrender.com/Users/Delete/${id}`, {
                headers: { authorization: Cookie.auth_token }
            })
            .then(() => { 
                navigate("/Registration")
                window.localStorage.clear()
            })
        }
        catch (Error){
            console.log(Error)
        }
    }

return (
    <div className='DeleteProfile'>
        <h1>We are sorry to see you go, but hope to see you again!</h1>
        <button onClick={() => DeleteUser(myID)}><i class="fa-solid fa-trash"></i>Confirm Delete</button> 
    </div>
)
}

export default DeleteProfile