const { create ,getUserByUserId,getUsers,updateUser,deleteuser,getUserByUserEmail} = require("./user.servise");
const {genSaltSync,hashSync,compareSync}=require("bcrypt");
const{sign} =require("jsonwebtoken");
module.exports={
    createUser:(req,res)=>{
    },
    getUserByUserId:(req,res)=>{
        const Id=req.params.Id;
        getUserByUserId(Id,(err,results)=>{
            if(err){
                console.log(err);
                return;
            }
            if(!results){
                return res.json({
                    success:0,
                    message:"Record not found"
                });
            }
            return res.json({
                success:1,
                data:results
            });
        });
    },
    updateUsers:(req,res)=>{
        const body=req.body;
        const salt =genSaltSync(10);
        body.password=hashSync(body.password,salt);
        updateUser(body,(err,results)=>{
            if(err){
                console.log(err);
                return;
            }
            if(!results){
                return res.json({
                   success:0,
                   message:"Falied to update user"
                }) 
            }
            return res.json({
                success:1,
                message:"updated successfully"
            });
        });
    },
    deleteUsers:(req,res)=>{
        const data=req.body;
        deleteUser(data,(err,results)=> {
            if(err){
                console.log(err);
                return;
            }
            if(!results){
                return res.json({
                    success:0,
                    message:"Record not found"
                });
            }
            return res.json({
                success:1,
                message:"user deleted successfully"
            });
        });
},
login:(req,res)=>{
    const body=req.body;
    getUserByUserEmail(body,email,(err,results)=>{
        if(err){
            console.log(err);
        }
        if(!results){
            return res.json({
                success:0,
                data:"Invalied email or password",
            });
        }
        const result = compareSync(body,password,results.password);
        if(result){
            result.password=undefined;
            const jsontoken=sign({result:results},"que1234",{
                expiresIn:"in"
            });
            return res.json({
                success:1,
                message:"login successfully",
                token:jsontoken
            });
        } else{
            return res.json({
                success:0,
                data:"Invalied email or password",
            });
        }
    });
},
};