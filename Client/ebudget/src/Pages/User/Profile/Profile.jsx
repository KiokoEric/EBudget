import React, { useEffect } from 'react';
import Axios from "axios";
import "../Profile/Profile.css";
import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import { useCookies } from "react-cookie";
import { useParams } from 'react-router-dom';

const Profile = () => {

    const [Cookie, setCookie] = useCookies(["auth_token"]);
    const navigate = useNavigate()

    // USESTATE

    const [Name, setName] = useState("")
    const [Email, setEmail] = useState("")
    const [Password, setPassword] = useState("") 
    const [Success, setSuccess] = useState("")
    const { userID } = useParams()
    const [showPassword, setShowPassword] = useState(false);

    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    };

    // HandleChanges : OnChange

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
            console.log("")
        }
        }

        FetchUser()
        
    }, [])

    const EditDetails = () => {
        navigate(`/Profile/${userID}`)
    } 

    const DeleteUser = () => {
        navigate(`/DeleteProfile`)
    }

return (
    <div className='Profile' >
        <article>
            <section>
                <i id='User' class="fa-solid fa-user"></i>
                <h3>My Profile</h3>
            </section>
            <section>
                <form method="post" encType="multipart/form-data">
                    <div>
                        <label for="">Name</label>
                        <input type="text" name="Name" id="Name" placeholder="Enter Name..." value={Name}  onChange={handleName} readOnly />
                    </div>
                    <div> 
                        <label for="">Email</label>
                        <input type="email" name="Email" id="Email" placeholder="Enter Email..." value={Email} onChange={handleEmail} readOnly />
                    </div>
                    <div>
                        <label for="">Password</label>
                        <article>
                            <input  type={showPassword ? 'text' : 'password'} name="Password" id="myPassword" placeholder="Enter Password..." value={Password} onChange={handlePassword} readOnly/>
                            {showPassword ? <i onClick={handleTogglePassword} id='Eye' class="fa-solid fa-eye"></i> : <i id='Eye' onClick={handleTogglePassword} class="fa-solid fa-eye-slash"></i> }
                        </article>
                    </div>
                    <h4 className='Success'>{Success}</h4>
                    <div>
                        <button onClick={EditDetails} type="submit"><i class="fa-solid fa-pen-to-square"></i>Edit My Details</button>
                        <button onClick={DeleteUser}><i class="fa-solid fa-trash"></i>Delete My Profile</button>
                    </div>
                </form>
            </section> 
        </article>
    </div>
)
}

export default Profile