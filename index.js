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
        const newRecord = await pool.query("INSERT INTO records (date, oxygen) VALUES($1, $2) RETURNING *", [date, oxygen]);
        response.json(newRecord.rows[0]);
    } catch (error) {
        console.log(error.message)
    }
});
//get all records
app.get("/records", async(request, response) => {
    try {
       const allRecords = await pool.query("SELECT * FROM records");
       response.json(allRecords.rows); 
    } catch (error) {
        console.log(error.message)
    }
})

//get a record
app.get("/records/:id", async (request, response) => {
    try {
        const { id } = request.params;
        const record = await pool.query("SELECT * FROM records WHERE id = $1", [id])
        response.json(record.rows[0])
    } catch (error) {
        console.log(error.message)
    }
})
//delete a record
app.delete("/records/:id", async (request, response) => {
    try {
      const { id } = request.params
      const deleteRecord = await pool.query("DELETE FROM records WHERE id = $1", [id]);
      response.json('Record was deleted')  
    } catch (error) {
        console.log(error.message)
    }
})

app.listen(5000, () => {
  console.log("We Don't Go To Ravenholm");  
})
