import { createContext, useContext, useState, useEffect } from "react";

const AppContext = createContext(null);

export const useAppContext = () => {
    const context = useContext(AppContext)

    if (context === undefined) {
        throw new Error('App context must be within App context provider. ')
    }
    return context
}

const AppContextProvider = ({children}) => {

    const TransactionState = () => {
        let TransactionDetails = localStorage.getItem("DashboardTransaction");
        
        if (TransactionDetails) {
            return JSON.parse(localStorage.getItem("DashboardTransaction"))
        } else {
            return [];
        }
    }

    const [Income, setIncome]= useState([])
    const [Expenses, setExpenses] = useState([])
    const [Transactions, setTransactions] =useState(TransactionState())

    const AddIncomes= (Income) => { 
        setIncome(Income)
    }

    const AddExpenses = (Expenses) => {
        setExpenses(Expenses)
    }

    const AddTransaction = (Transactions) => {
        setTransactions([...Transactions])
    }
    
    useEffect(() => {
        localStorage.setItem("DashboardTransaction", JSON.stringify(Transactions))
    },[Transactions]);

    return (
        <AppContext.Provider value={{Income, Expenses, Transactions, AddIncomes, AddExpenses, AddTransaction}} >
            {children}
        </AppContext.Provider>
    )
}

export default AppContextProvider;

