const pool =require("../../config/database");
const { get } = require("./user.router");

module.exports = {
    create:(data,callBack)=>{ 
    },
        getUsers:callBack=>{
        },
        getUserByUserId:(Id,callBack)=> {
            pool.query(
                'select Id,firstname,lastname,gender,email,password,number from registration',
                [],
                (error,results,fields)=>{
                    if(error){
                       return callBack(error);
                    }
                    return callBack(null,results);
                }
            );
        },
        updateUser:(data,callBack)=>{ 
                pool.query(
                    'update reqistration set firstname-?,lastname-?,gender-?,email-?,password-?,number-? where Id -?',
                    [
                        data.first_name,
                        data.last_name,
                        data.gender,
                        data.email,
                        data.password,
                        data.number,
                        data.Id
                    ],
                    (error,results,fields)=>{
                        if(error){
                           return callBack(error);
                        }
                        return callBack(null,results);
                    }
                );
            },
            deleteuser:(data,callBack)=>{ 
                pool.query(
                   'delete from registeration where Id =?',
                    [
                        data.Id
                    ],
                    (error,results,fields)=>{
                        if(error){
                           return callBack(error);
                        }
                        return callBack(null,results);
                    }
                );
            },
            getUserByUserEmail:(email,callBack)=>{
                pool.query(
                    'select*from registration where email =?',
                    [email],
                    (error,results,fields)=>{
                        if(error){
                            callBack(error);
                        }
                        return callBack(null,results);
                    }
                );
            }
    };