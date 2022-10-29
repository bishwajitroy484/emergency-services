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

//Fetch all the State Exist in the DB
router.get("/getstate", (req, res) => {
    conn.query("SELECT * FROM state_master", (err, result) => {
        if (err) {
            res.status(422).json("nodata available");
        } else {
            res.status(201).json(result);
        }
    })
});

//Fetch all the Services Exist in the DB
router.get("/getservices", (req, res) => {
    conn.query("SELECT rescue_id as id ,name FROM rescue_system_master", (err, result) => {
        if (err) {
            res.status(422).json("nodata available");
        } else {
            res.status(201).json(result);
        }
    })
});

//Fetch all the Call Status Exist in the DB
router.get("/getcallstatus", (req, res) => {
    conn.query("SELECT id ,name FROM call_status_master", (err, result) => {
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

//Create a New Operator ( Sign Up Form )
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

//Login Auth ( Login Form )
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

//Fetch User Details where PhoneNumber Match..
router.get("/userdetails/:id", (req, res) => {
    const { id } = req.params;

    const query = `SELECT Adhar, phone_no, city_master.name as city,state_master.name as state, street,pincode,house_no FROM user_master
    JOIN city_master
      ON city_master.city_id = user_master.city_id
    JOIN location_master
      ON location_master.location_id = user_master.location_id
    JOIN state_master
      ON state_master.state_id = city_master.state_id
      Where user_master.phone_no = ${id}`
    conn.query(query, id, (err, result) => {
        if (err) {
            res.status(422).json("error");
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


