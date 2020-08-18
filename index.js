//WDGTR
//NCWH
const express = require('express');
const app = express();
const cors = require('cors');
const pool = require('./database')

//middleware
app.use(cors());
app.use(express.json());

//Routes

//create record
app.post("/reports", async (request, response) => {
    try {
        const date = request.body.date;
        const oxygen = request.body.oxygen;
        const newReport = await pool.query("INSERT INTO reports (date, oxygen) VALUES($1, $2) RETURNING *", [date, oxygen]);
        response.json(newReport.rows[0]);
    } catch (error) {
        console.log(error.message)
    }
});
//get all records
app.get("/reports", async(request, response) => {
    try {
       const allReports = await pool.query("SELECT * FROM reports");
       response.json(allReports.rows); 
    } catch (error) {
        console.log(error.message)
    }
})

//get a record

//delete a record

app.listen(5000, () => {
  console.log("We Don't Go To Ravenholm");  
})
