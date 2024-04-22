const jwt=require("jsonwebtoken")
const maxLifeSpan=30 * 24 * 60 * 60 * 1000
function createJsonWebToken(id)
{
return jwt.sign({id},process.env.SECRET,{expiresIn:maxLifeSpan})
}
function removeCookie(cookieName,res,token)
{
    res.cookie("jwt",token,{maxAge:0})
}
module.exports={
    createJsonWebToken,
    removeCookie,
    maxLifeSpan
}