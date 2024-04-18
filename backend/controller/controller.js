const {db}=require("../db/db.js")
const bcrypt = require('bcrypt');
const randomPassword=require("../utils/randomPassword.js")
function allData(req,res){
    try{
db.query("select * from books",(err,result)=>{
    if(err)
    throw err
if(Array.isArray(result.rows))
{
    res.json(result.rows)
}
})
    }
    catch(error)
    {
        console.log(error)
res.status(500).json({"mssg":"There was an error"})
    }
}
function register(req,res)
{
const {firstName,lastName,email,password}=req.body
const response={
    "route":"/login",
    "mssg":`user ${firstName} registered`
}
try{
let userData=undefined
db.query("select * from users where email = $1",[email],(error,result)=>{
if(error)
throw error
userData=result.rows[0]
if(userData)
{
    response['mssg']=`user ${email} arleady registered`
    return res.json(response)
}
else{
    const saltRounds = 1;
    bcrypt.genSalt(saltRounds, function(err, salt) {
        bcrypt.hash(password, salt, async function(err, hash) {
            const id=randomPassword()
           db.query("insert into users(id,first_name,last_name,email,password) values($1,$2,$3,$4,$5)",[id,firstName,lastName,email,hash])
           response['route']="/"
           return res.json(response)
            
        })
})
}

})
}
catch(error)
{
    console.log(error)
}


}
function login(req,res){
    const {firstName,lastName,email,password}=req.body

    const response={
        "route":"/",
        "mssg":`user ${firstName} logged in`
    }
    try{
db.query("select * from users where email=$1",[email],(error,result)=>{
    const record=result.rows[0]
    if(record)
    {
        if(record["first_name"]!==firstName || record["last_name"]!==lastName)
        {
            response["mssg"]="check values in the field"
            response['route']=undefined
            return res.json(response)
        }
        bcrypt.compare(password, record.password, function(err, result) {
            if(result)
            {
                return res.status(303).json(response)
            }
            else{
              
                return res.status(400).json(response)
            }
        
            })
    }
    else{
        response["route"]="/register"
        response["mssg"]="Not registered"
        return res.json(response)
    }
})
    }
catch(error){

}
}
module.exports={allData,login,register}