const express = require("express");
const router = new express.Router();
const conn = require("../connection");

router.get("/getcity", (req, res) => {

    conn.query("SELECT * FROM city_master", (err, result) => {
        if (err) {
            res.status(422).json("nodata available");
        } else {
            res.status(201).json(result);
        }
    })
});

router.get("/getservices", (req, res) => {

    conn.query("SELECT * FROM rescue_system_master", (err, result) => {
        if (err) {
            res.status(422).json("nodata available");
        } else {
            res.status(201).json(result);
        }
    })
});
//

// user delete api

// router.delete("/deleteuser/:id",(req,res)=>{

//     const {id} = req.params;

//     conn.query("DELETE FROM users WHERE id = ? ",id,(err,result)=>{
//         if(err){
//             res.status(422).json("error");
//         }else{
//             res.status(201).json(result);
//         }
//     })
// });



// get single user

// router.get("/induser/:id",(req,res)=>{

//     const {id} = req.params;

//     conn.query("SELECT * FROM users WHERE id = ? ",id,(err,result)=>{
//         if(err){
//             res.status(422).json("error");
//         }else{
//             res.status(201).json(result);
//         }
//     })
// });


// update users api


// router.patch("/updateuser/:id",(req,res)=>{

//     const {id} = req.params;

//     const data = req.body;

//     conn.query("UPDATE users SET ? WHERE id = ? ",[data,id],(err,result)=>{
//         if(err){
//             res.status(422).json({message:"error"});
//         }else{
//             res.status(201).json(result);
//         }
//     })
// });

module.exports = router;


