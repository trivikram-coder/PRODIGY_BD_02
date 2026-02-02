const express=require("express")
const router=express().router
const {createUser, getUser, updateUser, deleteUser, getUsers}=require("../controller/userController")
router.post("/",createUser)
router.get("/:id",getUser)
router.get("/",getUsers)
router.put("/:id",updateUser)
router.delete("/:id",deleteUser)
module.exports=router