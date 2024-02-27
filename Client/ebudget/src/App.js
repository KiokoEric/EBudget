import './App.css';
import { useGetUserID } from "./Components/Hooks/UseGetUserID";
import { Routes, Route, Navigate } from 'react-router-dom';
import { SideBar } from './Components/SideBar/SideBar';
import Dashboard from './Pages/Dashboard/Dashboard';
import Incomes from '../src/Pages/Incomes/Incomes';
import Expenses from './Pages/Expenses/Expenses';
import Loan_Calculator from './Pages/Loan_Calculator/Loan_Calculator';
import Login from './Pages/User/Login/Login';
import Registration from './Pages/User/Registration/Registration';
import Profile from './Pages/User/Profile/Profile';
import EditDetails from './Pages/User/EditDetails/EditDetails';
import DeleteProfile from './Pages/User/DeleteProfile/DeleteProfile';
import Savings from './Pages/Savings/Savings';
import EditIncome from './Pages/Edit/IncomeTransaction/EditIncome';
import EditExpense from './Pages/Edit/ExpenseTransaction/EditExpense';
import EditSavings from './Pages/Edit/SavingsTransaction/EditSavings';

function App() {

  const ID = useGetUserID()

  return (
    <div className="App">
      <section>
        <SideBar />
      </section>
      <section>
        <Routes>
          <Route path='/Dashboard' element={ ID ? <Dashboard/> : <Navigate to="/" /> } />
          <Route path='/Income' element={ ID ? <Incomes /> : <Navigate to="/" /> } />
          <Route path='/Expense' element={ID ? <Expenses /> : <Navigate to="/" /> } />
          <Route path='/Savings' element={ID ? <Savings /> : <Navigate to="/" /> } />
          <Route path='/Income/:_id' element={<EditIncome />} />
          <Route path='/Expense/:_id' element={<EditExpense />} />
          <Route path='/Savings/:_id' element={<EditSavings />} />
          <Route path='/Loan_Calculator' element={ ID ? <Loan_Calculator /> : <Navigate to="/" />} />
          <Route path='/:userID' element={ ID ? <Profile/> : <Navigate to="/" /> } />
          <Route path='/Registration' element={<Registration />} />
          <Route path='/Profile/:userID' element={<EditDetails />} />
          <Route path='/DeleteProfile' element={<DeleteProfile />} />
          <Route path='/' element={<Login />} />
        </Routes>
      </section>
    </div>
  );
}

export default App;
