import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import dotenv from "dotenv"
import authRoutes from "./routes/authRoutes.js"
import productRoutes from "./routes/productRoutes.js"
import userRoutes from "./routes/userRoutes.js"

dotenv.config()

const app = express()
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
)
app.use(express.json())

mongoose.connect(process.env.MONGO_URI)
.then(()=> console.log("Mongo Connected"))
.catch((err)=>console.log(err))

app.use('/auth',authRoutes)
app.use('/products',productRoutes)
app.use('/users',userRoutes)

app.get("/",(req,res)=>{
    res.send("Server running")
})

const PORT = process.env.PORT || 8000;

app.listen(PORT, ()=>{
    console.log(`Server is running at post ${PORT}`)
})
