const express=require("express")
const router=express.Router()
const {allData}=require("../controller/controller.js")
router.get("/all",allData)
router.get("/book/:id",async function(req,res)
{
    return res.status(200).json({"mag":"single book"})
})
router.post("/add",async function(req,res)
{
    const {id,title,isbn,pagecount,thumbnailUrl,shortDescription,longDescription,authors}
    =req.body
    const addedBook={id,title,isbn,pagecount,thumbnailUrl,shortDescription,longDescription,authors}
    //add to database
    return res.status(201).json(addedBook)
})
router.delete("/delete/:id",async function(req,res)
{
    const {id}=req.params
//delete from database
return res.json({"mssg":"book deleted"})
})
module.exports=router