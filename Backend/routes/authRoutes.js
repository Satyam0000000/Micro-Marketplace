import express from "express"
import { registerUser, login } from "../controllers/authController.js"
import {body} from "express-validator"

const router = express.Router()

router.post("/register",registerUser) //express validator to be apply

router.post("/login",login) //express validator to be apply

export default router

