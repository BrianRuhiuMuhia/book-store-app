const express=require("express")
const app=express()
const dotenv=require("dotenv")
const port=process.env.PORT || 5000
const insert=require("./insertData.js")
const router=require("./router/router.js")
app.use(express.json())
app.use(router)
app.listen(port,()=>{
    console.log(`server running on port ${port}`)
})
module.exports=app