const express=require("express")
const app=express()
const dotenv=require("dotenv")
const cors=require("cors")
const port=process.env.PORT || 5000
const router=require("./router/router.js")
app.use(express.json())
app.use(cors());
app.disable("x-powered-by"); //Reduce fingerprinting
app.use(router)
app.listen(port,()=>{
    console.log(`server running on port ${port}`)
})
module.exports=app