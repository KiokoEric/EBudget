import React from 'react';
import "../Login/Login.css";
import Axios from "axios";
import { useState } from 'react';
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

const Login = () => {

    const [Email, setEmail] = useState("")
    const [Password, setPassword] = useState("")
    const [Cookie, setCookie] = useCookies(["auth_token"]);
    const [Error, setError] = useState("")
    const [Success, setSucces] = useState("")
    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate()

    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    };

    const handleEmail = (e) => {
        setEmail(e.target.value)
    }

    const handlePassword = (e) => {
        setPassword(e.target.value)
    }

    const onLogin = async (e) => {
        e.preventDefault()
        const data = {
            Email, Password
        }
        try {
            setError(false)
            const response = await Axios.post("https://ebudget-server.onrender.com/Users/Login", data)
                setCookie("auth_token", response.data.Token)
                window.localStorage.setItem("UserID", response.data.UserID)
                setError("")
                setSucces("Logged in successfully!") 
        } catch (error) { 
            setSucces("")
            setError("Login unsuccessful!")
            console.log(error)
        }
    }

    const DemoLogin = async (e) => {
        e.preventDefault()
        const data = {
            Email : "kiokoerick040@gmail.com" , Password : "Victory2024"
        }
        try {
            setError(false)
            const response = await Axios.post("https://ebudget-server.onrender.com/Users/Login", data)
                setCookie("auth_token", response.data.Token)
                window.localStorage.setItem("UserID", response.data.UserID)
                setError("")
                setSucces("Logged in successfully!") 
        } catch (error) { 
            setSucces("")
            setError("Login unsuccessful!") 
            console.log(error) 
        }
    }

return (
    <div className='Login'> 
        <article>
            <section>
                <i id='User' class="fa-solid fa-user"></i>
                <h3>Login</h3>
            </section>
            <section>
                <form onSubmit={onLogin} method="post" encType="multipart/form-data">
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
                    <p className='Information'>{Success}</p>
                    <p className='Error'>{Error}</p>
                    <div>
                        <button onClick={onLogin} type="submit">Login</button>
                        <button onClick={DemoLogin}>Demo Login</button>
                    </div>
                </form>
            </section> 
        </article>
    </div> 
)
}

export default Login