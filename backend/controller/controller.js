const {db}=require("../db/db.js")
async function allData(req,res){
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
module.exports={allData}