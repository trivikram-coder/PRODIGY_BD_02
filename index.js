const express=require("express")
const app=express();
const dotenv=require("dotenv")
const authRoutes=require("./routes/userRoutes")
const db=require("./config/dbConfig")
dotenv.config()
app.use(express.json())
app.use("/users",authRoutes)
app.get("/",(req,res)=>{
    res.send("Task 1 Server running successfully ✅✅✅")
})
db()
const PORT=process.env.PORT || 3000
app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`)
})