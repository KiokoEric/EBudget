import React, { useEffect, useState } from 'react';
import "../SideBar/SideBar.css";
import Axios from "axios";
import { useGetUserID } from "../../Components/Hooks/UseGetUserID";
import { useCookies } from "react-cookie";
import {useNavigate} from "react-router-dom";
import { BiLogOut } from "react-icons/bi"
import { BiSolidDashboard } from "react-icons/bi";
import { AiOutlineUserAdd } from "react-icons/ai";
import { AiOutlineUser } from "react-icons/ai";
import { FiLogIn } from "react-icons/fi";
import { Link } from "react-router-dom";

export const SideBar = () => {

    const [Name, setName] = useState("")
    const userID = useGetUserID();

    useEffect(() => {
        
        const FetchName  = async() => {
            await Axios.get(`https://ebudget-server.onrender.com/Users/${userID}/Name`, {
            headers: { authorization: Cookie.auth_token },
            }) 
            .then((Response) => {
                setName(Response.data.Name)
            })
        } 
    
        if (userID) {
            FetchName()
        } 

    },[userID])

    const [ Cookie, setCookie ] = useCookies(["auth_token"]);

    const navigate = useNavigate()

    const Logout = () => {
        setCookie("auth_token", "");
        window.localStorage.clear();
        navigate("/");
    }

return (
    <article className='SideBar'>
        <section>
            <div>
                <figure>
                    <i class="fa-solid fa-user"></i> 
                    <h1>EBudget</h1>
                </figure>
                {userID ? <h3>Welcome {Name}</h3> : null }
            </div>
            <div>
                <Link to="/Dashboard" className='Link' >
                    < BiSolidDashboard className='ReactIcon' />
                    Dashboard
                </Link>
                <Link to="/Income" className='Link' >
                    <i class="fa-solid fa-money-bill-trend-up"></i>
                    Incomes
                </Link>
                <Link to="/Expense" className='Link' >
                    <i class="fa-solid fa-money-bill-transfer"></i>
                    Expenses
                </Link>
                <Link to="/Savings" className='Link' >
                    <i class="fa-solid fa-piggy-bank"></i>
                    Savings & Investments
                </Link>
                <Link to="/Loan_Calculator" className='Link' >
                    <i class="fa-solid fa-building-columns"></i>
                    Loan Calculator
                </Link>
            </div>
        </section>
        <section>
            <div>
                {
                userID ? <Link to={`/${userID}`} className='Link' >
                    <AiOutlineUser className='ReactIcon' />
                    Profile
                </Link> : ""
                }
                {
                !userID ? <Link to="/Registration" className='Link' >
                    <AiOutlineUserAdd className='ReactIcon' />
                        Sign Up
                    </Link> : ""
                }
                {
                !Cookie.auth_token ?
                (
                    <Link to="/" className='Link' >
                        <FiLogIn className='ReactIcon' />
                        Login
                    </Link>
                ) : 
                (
                    <button onClick={Logout} className='Logout'>
                        <BiLogOut className="ReactIcon" />
                        Logout
                    </button>
                )
                }
            </div>
        </section>
    </article>
)
}
