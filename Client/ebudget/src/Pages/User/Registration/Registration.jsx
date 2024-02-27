import React from 'react';
import Axios from "axios";
import "../Registration/Registration.css";
import { useNavigate } from "react-router-dom";
import { useState } from 'react';

const Registration = () => { 

    const [Name, setName] = useState("")
    const [Email, setEmail] = useState("")
    const [Password, setPassword] = useState("") 
    const [Success, setSucces] = useState("")
    const [Error, setError] = useState("")
    const [FieldError, setFieldError] = useState("")
    const [showPassword, setShowPassword] = useState(false);

    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    };

    const navigate = useNavigate()

    const handleName = (e) => {
        setName(e.target.value)
    }

    const handleEmail = (e) => {
        setEmail(e.target.value)
    } 

    const handlePassword = (e) => {
        setPassword(e.target.value)
    }

    const onRegister = async (e) => {
        e.preventDefault()

        if (Name === "") {
            setFieldError("Name, Email and Password Fields are required!")
        } else if (Email === "") {
            setFieldError("Name, Email and Password Fields are required!")
        } else if (Password === "") {
            setFieldError("Name, Email and Password Fields are required!")
        } else {
            const data = {
                Name, Email, Password
            }
            try {
                setError(false)
                await Axios.post("https://ebudget-server.onrender.com/Users/Registration", data)
                .then(() => {
                    setSucces("Registration is successful. ")
                }) 
            } catch (error) {
                setError("Invalid Username or Email!") 
                console.error(error)
            }
        }
    }

return (
    <div className='Registration' >
        <article>
            <section>
                <i id='User' class="fa-solid fa-user"></i>
                <h3>Sign Up</h3>
            </section>
            <section>
                <form onSubmit={onRegister} method="post" encType="multipart/form-data">
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
                        <p className='Information'>{Success}</p>
                        <p className='Error'>{FieldError}</p>
                        <p className='Error'>{Error}</p>
                    </div>
                    <button onClick={onRegister} type="submit">Sign Up</button>
                </form>
            </section> 
        </article>
    </div>
)
}

export default Registration