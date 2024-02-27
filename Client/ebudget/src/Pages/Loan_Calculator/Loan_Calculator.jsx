import React, { useState, useEffect } from "react";
import LoanJS  from 'loanjs';
import "../Loan_Calculator/Loan_Calculator.css"

const Loan_Calculator = () => {

    const LoanState = () => {
        let Installment = localStorage.getItem("Payments"); 

        if (Installment) {
            return JSON.parse(localStorage.getItem("Payments"))
        } else {
            return [];
        }
    }

    const [LoanAmount, setLoanAmount] = useState("");
    const [InterestRate, setInterestRate] = useState("");
    const [LoanTerm, setLoanTerm] = useState("");
    const [Totals, setTotals] = useState([])
    const [Installments, setInstallments] = useState(LoanState)
    const [LoanAmountError, setLoanAmountError] = useState("")
    const [InterestRateError, setInterestRateError] = useState("")
    const [LoanTermError, setLoanTermError] = useState("")

    const AmountChange = (e) => {
    setLoanAmount(e.target.value)
    }

    const InterestRateChange = (e) => {
    setInterestRate(e.target.value)
    }

    const LoanTermChange = (e) => {
    setLoanTerm(e.target.value)
    }

    const handleSubmit =(e) => {
    e.preventDefault()
    
    if (LoanAmount === "") {
        setLoanAmountError("Loan amount is required!")
    } else if(InterestRate === ""  ) {
        setLoanAmountError("")
        setLoanTermError("")
        setInterestRateError("Interest rate is required!")
    } else if (LoanTerm === "") {
        setLoanAmountError("")
        setInterestRateError("")
        setLoanTermError("Loan term is required!")
    } else {
        setLoanAmount("")
        setLoanAmountError("")
        setInterestRate("")
        setInterestRateError("")
        setLoanTerm("")
        setLoanTermError("")
        calculateMonthlyPayment(LoanAmount, LoanTerm, InterestRate)
    }
    }

    const calculateMonthlyPayment = () => {   

        let Loan = new LoanJS.Loan(LoanAmount, LoanTerm* 12, InterestRate);
        console.log(Loan)
        setTotals(Loan)
        setInstallments(Loan.installments);
    };

    useEffect(() => {
        localStorage.setItem("Payments", JSON.stringify(Installments))
    },[Installments]);


return (
    <div className='Calculator' >
        <section>
            <h1>Loan Calculator</h1>
        </section>
        <section>
        <form onSubmit={handleSubmit} >
            <div>
                <section>
                    <p>
                        <label>Loan Amount</label>
                        <input type="number" name='LoanAmount' value={LoanAmount}  placeholder="Enter Loan Amount" onChange={AmountChange} />
                        <span>{LoanAmountError}</span>
                    </p>
                    <p>
                        <label>Interest Rate</label>
                        <input type="number" name='InterestRate' value={InterestRate}  placeholder="Enter Annual Interest Rate" onChange={InterestRateChange} />
                        <span>{InterestRateError}</span>
                    </p>
                    <p>
                        <label>Loan Term (Years) </label>
                        <input type="number" name='LoanTerm' value={LoanTerm}  placeholder="Enter Loan Duration" onChange={LoanTermChange} />
                        <span>{LoanTermError}</span> 
                    </p>
                </section>
                <section>
                    <div>
                        <p>
                            <label>Total Interest Payable</label>
                            <input type="text" value={Totals.interestSum} readOnly />
                        </p>
                        <p>
                            <label>Total Payment (Loan Amount + Interest)</label>
                            <input type="text" value={Totals.sum} readOnly />
                        </p>
                    </div>
                </section>
            </div>
            <div>
                <button onClick={handleSubmit} >Calculate</button>
            </div>
        </form>
        </section>
        <section>
            <table>
                <thead>
                    <tr>
                        <td>Month</td>
                        <td>Payment Amount</td>
                        <td>Interest Payment</td>
                        <td>Principal Paid</td>
                        <td>Remainder</td>
                    </tr>
                </thead>
                <tbody className="Installments" >
                    {
                        Installments.map((Installment, index) => (
                        <tr key={Installment.id} >
                            <td>{index + 1}</td>
                            <td>{Installment.installment}</td>
                            <td>{Installment.interest.toFixed(2)}</td>
                            <td>{Installment.capital.toFixed(2)}</td>
                            <td>{Installment.remain.toFixed(2)}</td>
                        </tr>
                        ))
                    }
                </tbody>
            </table>
        </section>
    </div>
)
}

export default Loan_Calculator