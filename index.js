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
app.post("/records", async (request, response) => {
    try {
        const date = request.body.date;
        const oxygen = request.body.oxygen;
        const newRecord = await pool.query("INSERT INTO reports (date, oxygen) VALUES($1, $2)", [date, oxygen]);
        response.json(newRecord);
    } catch (error) {
        console.log(error.message)
    }
});
//get all records

//get a record

//delete a record

app.listen(5000, () => {
  console.log("We Don't Go To Ravenholm");  
})
