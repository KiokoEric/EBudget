import React, { useEffect, useState } from 'react';
import Axios from "axios";
import "../ChartImage/ChartImage.css";
import { useCookies } from "react-cookie";
import { useGetUserID } from "../../Components/Hooks/UseGetUserID";
import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement } from "chart.js";

Chart.register(ArcElement)

const ChartImage = () => { 

    const [Cookie, setCookie] = useCookies(["auth_token"]);
    const userID = useGetUserID();

    const [ TotalIncome, setTotalIncome ] = useState("")
    const [ TotalExpenses, setTotalExpenses ] = useState("")
    const [ TotalSavings, setTotalSavings ] = useState("")

    useEffect(() => {

        const FetchTotalIncomes = async() => {
            await Axios.get(`https://ebudget-server.onrender.com/Income/${userID}/TotalIncomes`, {
            headers: { authorization: Cookie.auth_token },
            }) 
            .then((Response) => {
                setTotalIncome(Response.data.TotalAmount)
            })
        }

        const FetchTotalExpenses = async() => {
            await Axios.get(`https://ebudget-server.onrender.com/Expense/${userID}/TotalExpenses`, {
            headers: { authorization: Cookie.auth_token },
            }) 
            .then((Response) => {
                setTotalExpenses(Response.data.TotalAmount)
            })
        }

        const FetchTotalSavings = async() => {
            await Axios.get(`https://ebudget-server.onrender.com/Savings/${userID}/TotalSavings`, {
            headers: { authorization: Cookie.auth_token },
            }) 
            .then((Response) => {
                setTotalSavings(Response.data.TotalAmount)
            })
        }

        FetchTotalIncomes()

        FetchTotalExpenses()

        FetchTotalSavings()

    }, [userID])

    const Balance = TotalIncome - TotalExpenses - TotalSavings

    const Config = {

        data: {
            
        datasets: [{
            label: 'My First Dataset',
            data: [TotalSavings , TotalExpenses, Balance ],
            backgroundColor: [
            'rgb(255, 205, 86)',
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
            ],
            hoverOffset: 4,
            borderRadius: 5, 
            spacing: 10,
        }]},
    
        options: {
            cutout: 10
        }
    }

return (
    <div>
        <Doughnut {...Config} ></Doughnut> 
    </div>
)
}

export default ChartImage