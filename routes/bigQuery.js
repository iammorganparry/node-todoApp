const express = require('express');
const router = express.Router();
const db = require('../models');
// Imports the Google Cloud client library
const {BigQuery} = require('@google-cloud/bigquery');

// const app = express();


//Main get request to API 
router.get('/', async (req,res) => {
   let results = await queryData(req,res);
   if(results.length > 0) {
       res.send(results);
   }
//    res.send(req.body);
});

async function queryData(req,res) {
    const bigquery = new BigQuery({
        projectId:'cloudiq-jay-prod-01'
    });
        const sqlQuery = `SELECT * FROM analytics_platform.dim_campaign
        limit 10`;
        const options = {
            query: sqlQuery,
            useLegacySql : true
        }
        // Runs the query
        const [rows] = await bigquery.query(options);
        // console.log('Query Results:');
        return rows;
}
//POST 
// router.post('/',(req,res) => {
//     db.Todo.create(req.body)
//     .then((newTodo) => {
//         res.status(201).json(newTodo);
//     }).catch((err) => {
//         res.send(err);
//     });
//     // res.send(req.body);
// });

// //GET Specific task
// router.get('/:id',(req,res) => {
//     console.log(req.params);
//     db.Todo.findById(req.params.id)
//     .then((todo) => {
//         res.send(todo);
//     })
//     .catch((err) => {
//         res.send(err);
//         console.log(err);
//     });
// });

// //Update a task
// router.put('/:id',(req,res) => {
//     db.Todo.findOneAndUpdate({_id : req.params.id},req.body, {new: true})
//     .then((todo) => {
//         res.send(todo);
//     })
//     .catch((err) => {
//         res.send(todo);
//     })
// });


// //Delete route 
// router.delete('/:id', (req,res) => {
//     db.Todo.deleteOne({_id: req.params.id})
//     .then((todo) => {
//         res.send(todo);
//     })
//     .catch((err) => {
//         res.send(err);
//     })
// });

module.exports = router;