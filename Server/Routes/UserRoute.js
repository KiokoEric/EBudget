const express = require('express');
const UserRouter = express.Router();
const cookieParser = require("cookie-parser");
const dotenv = require('dotenv');
const User = require("../Models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

dotenv.config();
UserRouter.use(cookieParser())

const myPassword = process.env.Password

UserRouter.post("/Registration", async (req, res) => {

    // Checking if the user is already in the database

    const EmailExist = await User.findOne({Email: req.body.Email})
    if(EmailExist) return res.status(400).send("Email already exists!")

    // Hash Password

    const salt = bcrypt.genSaltSync(10);
    var Hashedpassword = await bcrypt.hash(req.body.Password, salt); 

    const NewUser = new User ({
        Name: req.body.Name,
        Email: req.body.Email,
        Password: Hashedpassword
    })
    try {
        const SavedUser = await NewUser.save() 
        res.send(SavedUser)
    } catch (error) {
        console.error(error)
    }
})

UserRouter.post("/Login", async (req, res) => {

    // Checking if the email is in the database

    const NewUser = await User.findOne({Email: req.body.Email})
    if(!NewUser) return res.status(400).send("Email is not valid!");

    // correctPassword

    const validPassword = await bcrypt.compare(req.body.Password, NewUser.Password)
    if(!validPassword) return res.status(400).send("Password is not valid!");
    // Create and assign a token

    if (NewUser) {
        const Token = jwt.sign({_id: NewUser._id}, myPassword);
        res.json({Token, UserID: NewUser._id});
    }  
})

UserRouter.get('/:id', async (req, res) => {
    try {
    const UserDetails = await User.findById(req.params.id);
    if (!UserDetails) {
        return res.status(404).json({ message: 'User was not found' });
    }
    res.json(UserDetails);
    } catch (error) {
    res.status(500).json({ message: 'Server Error' });
    }
});

UserRouter.get('/:userId/Name', async (req, res) => { 

    try {
    const UserID= await User.findById(req.params.userId);
    if (!UserID) {
        return res.status(404).json({ message: 'User was not found' });
    }
    res.json({ Name: UserID.Name });
    } catch (error) {
    res.status(500).json({ message: 'Server Error' });
    }
});

// UPDATE

UserRouter.put("/:id", async (req, res) => {
    const userId = req.params.id;
    const updatedProfile = req.body;

    try {

        if (updatedProfile.Password) {
            // Hash the password before saving it to the database
            const salt = await bcrypt.genSalt(10); 
            updatedProfile.Password = await bcrypt.hash(updatedProfile.Password, salt);
        }

        const Profile = await User.findByIdAndUpdate(userId, updatedProfile, { new: true });
        res.json({ success: true, message: 'Profile updated successfully' }); 
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Error updating profile' });
    }
}) 

// DELETE

UserRouter.delete("/Delete/:id", async (req, res) => { 
    try {
        const userId = req.params.id;

        // Delete the user from the database
        await User.findByIdAndDelete(userId);
        res.json({ message: 'User profile deleted successfully' }); 
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
})

UserRouter.get("/Logout", (req, res) => {
    res.clearCookie("Token");
})


module.exports = UserRouter; 