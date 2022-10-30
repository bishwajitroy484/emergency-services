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

//Create a new entry of user location
router.post("/userlocation", (req, res) => {
    const { street, pincode, house_no } = req.body;
    try {
        conn.query("INSERT INTO location_master SET ?", { street, pincode, house_no }, (err, result) => {
            if (err) {
                console.log("err" + err);
            } else {
                res.status(201).json(result.insertId);
            }
        })
    } catch (error) {
        res.status(422).json(error);
    }
});

//Create a new entry of call information
router.post("/callinfo", (req, res) => {
    const { notes, phone_number, call_status_id, call_start_time, call_end_time, operator_id } = req.body;
    try {
        conn.query("INSERT INTO call_info_master SET ?", { notes, phone_number, call_status_id, call_start_time, call_end_time, operator_id }, (err, result) => {
            if (err) {
                console.log("err" + err);
            } else {
                res.status(201).json(result.insertId);
            }
        })
    } catch (error) {
        res.status(422).json(error);
    }
});

//Create a new entry of alert maker
router.post("/alertmaker", (req, res) => {
    const { call_id, action_id } = req.body;
    try {
        conn.query("INSERT INTO alert_maker_master SET ?", { call_id, action_id }, (err, result) => {
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

//Create a new entry of user with location and city
router.post("/usermaster", (req, res) => {
    const { Adhar, city_id, phone_no, location_id } = req.body;
    try {
        conn.query("INSERT INTO user_master SET ?", { Adhar, city_id, phone_no, location_id }, (err, result) => {
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

//Update the User master Entry
router.patch("/usermasterupdate/:id", (req, res) => {
    const { id } = req.params;
    const data = req.body;
    conn.query("UPDATE user_master SET ? WHERE phone_no = ? ", [data, id], (err, result) => {
        if (err) {
            res.status(422).json({ message: "error" });
        } else {
            res.status(201).json(result);
        }
    })
});

////Update the User Location Entry
router.patch("/userlocationupdate/:id", (req, res) => {
    const { id } = req.params;
    const data = req.body;
    conn.query("UPDATE location_master SET ? WHERE location_id = ? ", [data, id], (err, result) => {
        if (err) {
            res.status(422).json({ message: "error" });
        } else {
            res.status(201).json(result);
        }
    })
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

    const query = `SELECT location_master.location_id,Adhar, phone_no, city_master.name as city,state_master.name as state, street,pincode,house_no FROM user_master
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

module.exports = router;


