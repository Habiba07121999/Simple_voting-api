const {createUser,getUserByUserId,getUsers,updateUsers,deleteUsers,login} =require("./user.controller");
const router =require("express").Router();

router.post("/",createUser);
router.get("/",getUsers);
router.get("/:Id",getUserByUserId);
router.patch("/",updateUsers);
router.delete("/",deleteUsers);
router.post("/login",login);
module.exports=router;