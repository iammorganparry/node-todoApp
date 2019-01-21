const express = require('express');
const router = express.Router();
const db = require('../models');
// Imports the Google Cloud client library
const {BigQuery} = require('@google-cloud/bigquery');
const bigquery = new BigQuery({
    projectId:'cloudiq-jay-prod-01'
});
// const app = express();


//Main get request to API 
router.get('/', async (req,res) => {
    let results = await getAllCampaignData(req,res)
    res.send(results);
//    res.send(req.body);
});

router.get('/:id', async(req,res) => {
    let results = await queryData(req,res)
    res.send(results);
});

async function queryData(req,res) {
    let tag_id = req.params.id;

        const sqlQuery = `SELECT * FROM analytics_platform.dim_campaign
        where tag_id = '${tag_id}'`;
        const options = {
            query: sqlQuery,
            useLegacySql : true
        }
        // Runs the query
        const [rows] = await bigquery.query(options)
        return rows;
}

async function getAllCampaignData(req,res) {
    let limit = req.body.limit || 10;
    
        const sqlQuery = `SELECT * FROM analytics_platform.dim_campaign
        limit ${limit}`;
        const options = {
            query: sqlQuery,
            useLegacySql : true
        }
        // Runs the query
        const [rows] = await bigquery.query(options)
        return rows;
}

module.exports = router;