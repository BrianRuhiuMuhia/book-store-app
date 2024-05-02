const jwt=require("jsonwebtoken")
const dotenv=require("dotenv")
function authUser(req,res,next)
{
    const token=req.cookies.jwt
   
if(token)
{
    jwt.verify(token,process.env.SECRET,(err,decToken)=>
    {
if(err)
{
  return  res.status(400).redirect("login")
}
else{
    next()
}
    })
}
else{
   return res.status(400).redirect("login")
}
}
module.exports={authUser}