const express = require('express');
const jwt = require("jsonwebtoken");
const dotenv = require('dotenv');
const IncomeRoute = express.Router();
const Income = require("../Models/IncomeTransaction");
const cookieParser = require("cookie-parser");

dotenv.config();
IncomeRoute.use(cookieParser())

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

IncomeRoute.post("/AddIncome", verifyToken ,async (req, res) => {
    const IncomeTransaction = new Income(req.body)
    try {
        const SavedIncomeTransaction = await IncomeTransaction.save()
        res.send(SavedIncomeTransaction)
    } catch (error) {
        console.error(error)
    }
})

IncomeRoute.get("/AllIncomes", async (req, res) => { 
    try{
        const AllIncomeTransaction = await Income.find() 
        res.json(AllIncomeTransaction)
    }
    catch(err) { 
        res.send(err)  
    } 
})

IncomeRoute.get("/:userId/TotalIncomes", async (req, res) => {
    const userId = req.params.userId;
    
    try{
        const TotalIncome = await Income.find({ userOwner: userId });
        const TotalAmount = TotalIncome.reduce((total, Incomes) => total + Incomes.Amount, 0);
        res.json({ TotalAmount });
    }
    catch(err) { 
        res.send(err)     
    }
})

IncomeRoute.get('/:userId/Incomes', async (req, res) => {
    const userId = req.params.userId;
    try {
        const IncomeTransaction = await Income.find({ userOwner: userId });
        res.json(IncomeTransaction);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching blogs.' }); 
    }
});

// UPDATE

IncomeRoute.put("/:id", async (req, res) => {
    try{
        const IncomeTransaction = await Income.findByIdAndUpdate(req.params.id, req.body)
        res.json(IncomeTransaction)
    }
    catch(err) {
        res.send(err)
    }
})

// DELETE

IncomeRoute.delete("/:id", async (req, res) => {
    try{
        const IncomeTransaction = await Income.findByIdAndDelete(req.params.id)
        res.json({Message: "Deleted Successfully!"})
    }
    catch(err) {
        res.send(err)
    }
})

IncomeRoute.get('/:id', async (req, res) => {
    try {
    const IncomeTransaction = await Income.findById(req.params.id);
    if (!IncomeTransaction) {
        return res.status(404).json({ message: 'IncomeTransaction was not found' });
    }
    res.json(IncomeTransaction);
    } catch (error) {
    res.status(500).json({ message: 'Server Error' });
    }
});

module.exports = IncomeRoute