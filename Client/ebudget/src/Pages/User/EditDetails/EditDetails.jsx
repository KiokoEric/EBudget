import React, { useEffect } from 'react';
import Axios from "axios";
import { useCookies } from "react-cookie";
import "../EditDetails/EditDetails.css";
import {useNavigate, useParams} from "react-router-dom";
import { useState } from 'react';

const EditDetails = () => { 

    const [ Cookie, setCookie ] = useCookies(["auth_token"]);

    const [Name, setName] = useState("")
    const [Email, setEmail] = useState("")
    const [Password, setPassword] = useState("")
    const { userID } = useParams()
    const [Success, setSuccess] = useState("")
    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate()

    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    };

    const handleName = (e) => {
        setName(e.target.value)
    }

    const handleEmail = (e) => {
        setEmail(e.target.value)
    } 

    const handlePassword = (e) => {
        setPassword(e.target.value)
    }

    useEffect(() => {

        const FetchUser =() => {
        try{
            Axios.get(`https://ebudget-server.onrender.com/Users/${userID}`, {
            headers: { authorization: Cookie.auth_token },
            }) 
            .then((Data) => { 
                setName(Data.data.Name)
                setEmail(Data.data.Email)
                setPassword(Data.data.Password)
            })
        }
        catch (Error){
            console.log(Error)
        }
        }

        FetchUser()
        
    }, [])

    const EditUser = (e) => {
        e.preventDefault()


        const data = {
            Name, Email, Password
        }
        try {
            Axios.put(`https://ebudget-server.onrender.com/Users/${userID}`, data , {
                headers: { authorization: Cookie.auth_token },
            }) 
            .then(() => { 
                setSuccess("Succesfully edited.")
            })
        } catch (error) {
            console.error(error) 
        }
    } 

return (
    <div className='MyProfile'>
        <article>
            <section>
                <i id='User' class="fa-solid fa-user"></i>
                <h3>My Profile</h3>
            </section>
            <section>
            <form  encType="multipart/form-data">
                        <div>
                            <label for="">Name</label>
                            <input type="text" name="Name" id="Name" placeholder="Enter Name..." value={Name}  onChange={handleName} />
                        </div>
                        <div> 
                            <label for="">Email</label>
                            <input type="email" name="Email" id="Email" placeholder="Enter Email..." value={Email} onChange={handleEmail} />
                        </div>
                        <div>
                            <label for="">Password</label>
                            <article>
                                <input  type={showPassword ? 'text' : 'password'} name="Password" id="myPassword" placeholder="Enter Password..." value={Password} onChange={handlePassword}/>
                                {showPassword ? <i onClick={handleTogglePassword} id='Eye' class="fa-solid fa-eye"></i> : <i id='Eye' onClick={handleTogglePassword} class="fa-solid fa-eye-slash"></i> }
                            </article>
                        </div>
                        <h4 className='Success'>{Success}</h4>
                        <button onClick={EditUser} type="submit">Save Changes</button>
                    </form>
            </section> 
        </article>
    </div>
)
}

export default EditDetails