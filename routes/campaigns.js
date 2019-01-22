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
    results.forEach((row) => {
        res.send(row);
    });
});

//CSV Route
router.get('/CSV/:id',async (req,res) => {
    let results = await getCsvData(req,res)
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

function getCsvData(req,res) {
    return new Promise(async (resolve,reject) => {
        let tag_id = req.params.id;
        
            const sqlQuery = `SELECT end_ts order_ts,order_id,cart_last_total basket_value,cart_currency currency_code,cart_payment_method payment_method, event_ts as email_ts,profile_email email_address
            FROM analytics_platform.fact_interaction_info 
            LEFT OUTER JOIN analytics_platform.dim_exchange_rate
            ON (COALESCE(cart_currency, 'GBP') = base_currency AND target_currency = 'GBP')
            WHERE tag_id = '${tag_id}'
            AND end_ts <= CURRENT_TIMESTAMP()
            AND is_cancel = true
            AND cart_last_total > 0
            AND recovery_method IS NOT NULL
            ORDER BY end_ts;`;
            const options = {
                query: sqlQuery
            }
            // Runs the query
            const [rows] = await bigquery.query(options)
            if(rows.length > 0) {
                resolve(rows);
            } else {
                reject(err);
            }
            // return rows;
    });
}

module.exports = router;