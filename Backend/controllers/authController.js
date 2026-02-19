import User from "../models/User.js"
import bcrypt from "bcrypt"
import generateToken from "../utils/generateToken.js"
import {validationResult} from "express-validator"

//all the function of auth managed here

export const registerUser = async (req,res) => {
    try {
        const error = validationResult(req)
        if(!error.isEmpty()){
            return res.status(400).json({error:error.array()});
        }
     

    const {name,email,password} = req.body
    const userExist = await User.findOne({email});

    //Checking user..
    if(userExist){
        return res.status(400).json({message:"User already present please login"})
    }

    //encrypting password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password,salt)

    //creating user :)
    const user = await User.create({
        name,
        email,
        password:hashedPassword,
    })

    res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
    })   
    }catch (error) {
        console.log(error)
        res.status(500).json({message:error.message})
    }
}


export const login = async(req,res)=>{
    try {
        const {email,password} = req.body
        //checking user is present
        const user = await User.findOne({email})
        
        if(!user){
            return res.status(401).json({message:"User not present"})
        }

        const isMatch = await bcrypt.compare(password,user.password)

        if(!isMatch){
            return res.status(401).json({message:"Password incorrect"})
        }

        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id),
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({message: error.message})
    }
}