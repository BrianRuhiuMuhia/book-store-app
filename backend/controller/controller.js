const {db}=require("../db/db.js")
const bcrypt = require('bcrypt');
const {createJsonWebToken,removeCookie,maxLifeSpan}=require("../utils/token.js")
const randomPassword=require("../utils/randomPassword.js")
let currUserId=undefined
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
    "mssg":{"message":`user ${firstName} registered`,"status":"success"}
}
try{
let userData=undefined
db.query("select * from users where email = $1",[email],(error,result)=>{
if(error)
throw error
userData=result.rows[0]
if(userData)
{
    response['mssg']={"message":`user ${email} arleady registered`,
"status":"error"}
    return res.json(response)
}

else{
    const saltRounds = 1;
    bcrypt.genSalt(saltRounds, function(err, salt) {
        bcrypt.hash(password, salt, async function(err, hash) {
            const id=randomPassword()
           db.query("insert into users(id,first_name,last_name,email,password) values($1,$2,$3,$4,$5)",[id,firstName,lastName,email,hash])
           response['route']="/login"
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
        // "route":"/",
        "mssg":{"message":`user ${firstName} logged in`,
    "status":"success"}
    }
    try{
db.query("select * from users where email=$1",[email],(error,result)=>{
    const record=result.rows[0]
    if(record)
    {
        if(record["first_name"]!==firstName || record["last_name"]!==lastName)
        {
            response["mssg"]={"message":"check values in the field","status":"error"}
            response['route']=undefined
            return res.json(response)
        }
        bcrypt.compare(password, record.password, function(err, result) {
            if(result)
            {
                const token=createJsonWebToken(record["id"])
                res.cookie("jwt", token, {
                    httpOnly: false,
                    secure: false, // Set to false for HTTP
                    maxAge:maxLifeSpan
                  });
                req.session.user = record;
                currUserId=record["id"]
                return res.status(303).json(response)
            }
            else{
              
                return res.status(400).json(response)
            }
        
            })
    }
    else{
        response["route"]="/register"
        response["mssg"]={"message":"Not registered","status":"error"}
        return res.json(response)
    }
})
    }
catch(error){

}
}
function addBook(req,res)
{
    const {id,title}
    =req.body
    const bookId=id
    const user=req.session.user
    try{
        db.query("select * from users_books where book_id = $1",[bookId],(err,result)=>{
            if(result.rows.length>0)
            {
                return res.status(200).json({"message":"book arleady saved"})
            }
            else{
                db.query("insert into users_books(user_id,book_id) values($1,$2)",[user["id"],bookId])
            }

        })
     
        
        
return res.status(201).json({"message":`book ${title} added`})
    }
    catch(err)
    {
        console.log(err)
        return res.status(500).json({"message":"server error"})
    }

  
}
function getUserBooks(req,res)
{
    const user=req.session.user
    try{
db.query("select *,users_books.user_id from books join users_books on(users_books.book_id=books.id) where users_books.user_id=$1",[user.id],(error,result)=>{
    if(result.rows)
    {
        return res.status(200).json(result.rows)
    }
})
    }
    catch(error)
    {
        console.log(error)
        return res.status(500).json({"message":"server error"})
    }
}
function logout(req,res)
{
    req.session.destroy(() => {
        removeCookie("jwt",res,token)
        console.log("Session destroyed!");
        res.status(200).json({"route":"/login","message":"logged out"})
      });
}
function deleteBook(req,res)
{
    const {id}=req.params
    try{
db.query("delete from users_books where book_id=$1",[id])
    }
    catch(error)
    {
        console.log(error)
    }
}
module.exports={allData,login,register,addBook,getUserBooks,logout,deleteBook}