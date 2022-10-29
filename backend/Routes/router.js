const express = require("express");
const router = new express.Router();
const conn = require("../connection");

//Fetch all the City Exist in the DB
router.get("/getcity", (req, res) => {
    conn.query("SELECT * FROM city_master", (err, result) => {
        if (err) {
            res.status(422).json("nodata available");
        } else {
            res.status(201).json(result);
        }
    })
});

//Fetch all the Services Exist in the DB
router.get("/getservices", (req, res) => {
    conn.query("SELECT * FROM rescue_system_master", (err, result) => {
        if (err) {
            res.status(422).json("nodata available");
        } else {
            res.status(201).json(result);
        }
    })
});

//Check IF User Exist in the DB
router.get("/user/:id", (req, res) => {
    const { id } = req.params;
    conn.query("SELECT * FROM operator_master WHERE username = ? ", id, (err, result) => {
        if (err) {
            res.status(422).json("error");
        } else {
            res.status(201).json(result);
        }
    })
});

router.post("/createuser", (req, res) => {
    const { fName, lName, username, password } = req.body;
    try {
        conn.query("INSERT INTO operator_master SET ?", { fName, lName, username, password }, (err, result) => {
            if (err) {
                console.log("err" + err);
            } else {
                res.status(201).json(req.body);
            }
        })
    } catch (error) {
        res.status(422).json(error);
    }
});

router.post("/auth", (req, res) => {
    const { username, password } = req.body;
    try {
        conn.query("SELECT * FROM operator_master WHERE username = ? AND password = ? ", [username, password], (err, result) => {
            if (err) {
                console.log("err" + err);
            } else {
                res.status(201).json(result);
            }
        })
    } catch (error) {
        res.status(422).json(error);
    }
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


