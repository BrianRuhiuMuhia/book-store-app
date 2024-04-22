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
  return  res.json({"route":"/login"})
}
else{
    next()
}
    })
}
else{
   return res.json({"route":"/login"})
}
}
module.exports={authUser}