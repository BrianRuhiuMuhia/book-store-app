function randomPassword()
{
    return Math.floor(Math.random() *1e6 +1)
}
module.exports=randomPassword