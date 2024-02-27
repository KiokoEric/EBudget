const express = require('express');
const jwt = require("jsonwebtoken");
const dotenv = require('dotenv');
const ExpenseRoute = express.Router();
const Expense = require("../Models/ExpenseTransaction");
const cookieParser = require("cookie-parser");

dotenv.config();
ExpenseRoute.use(cookieParser())

const myPassword = process.env.Password

const verifyToken = async (req, res, next) => {

    const authHeader = req.headers.authorization;
    if (authHeader) {
        jwt.verify(authHeader, myPassword , (err) => {
        if (err) {
            return res.sendStatus(403);
        }
        next();
        });
    } else {
        return res.status(401).send("Authorisation token is missing!");
    }
}

ExpenseRoute.post("/AddExpense", verifyToken ,async (req, res) => {
    const ExpenseTransaction = new Expense(req.body)
    try {
        const SavedExpenseTransaction = await ExpenseTransaction.save()
        res.send(SavedExpenseTransaction)
    } catch (error) {
        console.error(error)
    }
})

ExpenseRoute.get("/AllExpenses", async (req, res) => { 
    try{
        const AllExpenseTransaction = await Expense.find() 
        res.json(AllExpenseTransaction )
    }
    catch(err) { 
        res.send(err)  
    }
})

ExpenseRoute.get("/:userId/TotalExpenses", async (req, res) => {
    const userId = req.params.userId;

    try{
        const TotalExpense = await Expense.find({ userOwner: userId });
        const TotalAmount = TotalExpense.reduce((total, Expenses) => total + Expenses.Amount, 0);
        res.json({ TotalAmount });
    }
    catch(err) { 
        res.send(err)     
    }
})

ExpenseRoute.get('/:userId/Expenses', async (req, res) => { 
    const userId = req.params.userId;
    try {
        const ExpenseTransaction = await Expense.find({ userOwner: userId });
        res.json(ExpenseTransaction);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching blogs.' });
    }
});

// UPDATE

ExpenseRoute.put("/:id", async (req, res) => {
    try{
        const ExpenseTransaction = await Expense.findByIdAndUpdate(req.params.id, req.body)
        res.json(ExpenseTransaction)
    }
    catch(err) {
        res.send(err)
    }
})

// DELETE

ExpenseRoute.delete("/:id", async (req, res) => {
    try{
        const ExpenseTransaction = await Expense.findByIdAndDelete(req.params.id)
        res.json({Message: "Deleted Successfully!"})
    }
    catch(err) {
        res.send(err)
    }
})

ExpenseRoute.get('/:id', async (req, res) => {
    try {
    const ExpenseTransaction = await Expense.findById(req.params.id);
    if (!ExpenseTransaction) {
        return res.status(404).json({ message: 'Expense Transaction was not found' });
    }
    res.json(ExpenseTransaction);
    } catch (error) {
    res.status(500).json({ message: 'Server Error' });
    }
});

module.exports = ExpenseRoute