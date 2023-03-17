const express = require('express');
const cors = require("cors");
const mysql = require("mysql");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json({extended: true}));

const port = 3004;
const express = require('express');
const cors = require("cors");
const mysql = require("mysql");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json({extended: true}));

const port = 3004;

const dbConn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'chm'
    });

// connect to database
dbConn.connect(); 

// connection configuration

app.post("/userLogin", (request, response) => {
    const { userId, password } = request.body;

    try{
        response.setHeader("Content-Type", "application/json");
        const userQuery = `select * from users where user_id = ${userId} and password = '${password}' and  status = 'ACTIVE';`
        const roleQuery = `SELECT RU.ROLE_ID, R.ROLE_NAME, R.ROLE_CODE FROM ROLE_USER RU 
        INNER JOIN ROLES R ON RU.ROLE_ID = R.ROLE_ID WHERE RU.USER_ID = ${userId}`;

        dbConn.query(userQuery, (error, results) => {
            if(error){
                throw error;
            } else if(results.length === 0) {
                return response.json({error: {error_code: "INVALLID_CREDENTIAL"}, description: "invalid user credential"});
            } else if(results.length > 0){
                dbConn.query(roleQuery, (e, dataSet) => {
                    if(e)
                        throw e;
                    if(dataSet.length > 0){
                        return response.json(dataSet[0]);
                    } else {
                        return response.json({error: {error_code: "NO_ROLE"}, description: "no user role available"});
                    }
                });
            }else {
                return response.json({});
            }
        });
    } catch(error) {
        throw error;
    };
});

app.post("/getDoctorDetails", (request, response) => {
    const { doctorId } = request.body;
    console.log("body", request.body)
    try{
        response.setHeader("Content-Type", "application/json");
        dbConn.query(`SELECT * FROM DOCTORS WHERE DOCTOR_ID = ${doctorId}`, (error, results) => {
            if(error){
                throw error;
            }
            if(results.length > 0) {
                return response.json(results[0]);
            }
            return response.json({});
        });
    } catch(error) {
        throw error;
    };
});

app.post("/getHospitalDetails", (request, response) => {
    const { hospitalId } = request.body;
    try{
        response.setHeader("Content-Type", "application/json");
        dbConn.query(`SELECT * FROM HOSPITALS WHERE HOSPITAL_ID = ${hospitalId}`, (error, results) => {
            if(error){
                throw error;
            }
            if(results.length > 0) {
                return response.json(results[0]);
            }
            return response.json({});
        });
    } catch(error) {
        throw error;
    };
});

app.post("/getPatientDetails", (request, response) => {
    const { patientId } = request.body;
    try{
        response.setHeader("Content-Type", "application/json");
        dbConn.query(`SELECT * FROM PATIENTS WHERE PATIENT_ID = ${patientId}`, (error, results) => {
            if(error){
                throw error;
            }
            if(results.length > 0) {
                return response.json(results[0]);
            }
            return response.json({});
        });
    } catch(error) {
        throw error;
    };
});

app.post("/getAdminDetails", (request, response) => {
    const { adminId } = request.body;
    try{
        response.setHeader("Content-Type", "application/json");
        dbConn.query(`SELECT * FROM ADMIN WHERE ADMIN_ID = ${adminId}`, (error, results) => {
            if(error){
                throw error;
            }
            if(results.length > 0) {
                return response.json(results[0]);
            }
            return response.json({});
        });
    } catch(error) {
        throw error;
    };
});
app.get("/dummy", (req, res) => {
    res.json({})
})

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});

app.get("/dummy", (req, res) => {
    res.json({})
})

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
