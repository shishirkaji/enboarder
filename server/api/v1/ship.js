const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const dbPool = require('./../../db');
const axios = require('axios')
const pagination = require('./middleware/pagination')
router.get('/search', async (req, res) => {
    console.log(req.query)
    let { type, homeport, weight } = req.query;
    // server side validaton for input data. 
    // I would use express-validator to check validtion of data and then send errors as array. However, it does not imply in such case. I have 
    //put some validation to check if there are atleast one query params provided.
    if (!type && !weight && !homeport) return res.status(400).json({ msg: "no query params" })
    let errors = new Array
    let dbquerrystatement = `WHERE`
    if (type) {
        console.log(typeof type)
        if (typeof type !== "string") errors.push({ param: "type", msg: "The type must be string value" })
        dbquerrystatement = dbquerrystatement + ` type = "${type}" `;
    }
    if (homeport && type) dbquerrystatement = dbquerrystatement + `AND`;
    if (homeport) {
        if (typeof homeport !== "string") errors.push({ param: "homeport", msg: "The homeport must be string value" })
        dbquerrystatement = dbquerrystatement + ` homeport = "${homeport}" `
    };
    if (homeport || type) { if (weight) { dbquerrystatement = dbquerrystatement + `AND` } };
    if (weight) {
        function isNumeric(str) {
            if (typeof str != "string") return false // This only process strings!  
            return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
                !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
        }
        console.log(typeof weight)
        if (!isNumeric(weight)) errors.push({ param: "weight", msg: "The weight must be Number " })
        dbquerrystatement = dbquerrystatement + ` weight = ${weight}`
    };
    if (errors.length > 0) return res.status(400).json({ errors })
    console.log(dbquerrystatement)
    let sql = `SELECT * FROM ship ${type || homeport || weight ? dbquerrystatement : ";"}`
    console.log(sql)
    let rows = await dbPool.query(sql);
    return res.json({ ships: rows })
})
router.get("/count", async (req, res) => {
    let sql = `SELECT * FROM ship ;`
    let total = await dbPool.query(sql);
    total = total.length
    if (total < 1) {
        console.log("please reload the page")
    }
    return res.json({ total })
})
router.get('/', pagination, async (req, res) => {
    console.log(req.offset)
    let sql = `SELECT * FROM ship LIMIT ${req.offset},5;`
    let rows = await dbPool.query(sql);

    if (rows.length < 1) {
        var config = {
            method: 'get',
            url: 'https://api.spacexdata.com/v3/ships',
        };
        axios(config)
            .then(async function (response) {
                // store data to local db
                let shipArray = response.data;
                console.log(response.data.length)
                let sql = `INSERT  INTO ship (id, type, weight, homeport,name,class) VALUES `
                let length = response.data.length;
                for (let i = 0; i < length; i++) {
                    console.log(i)
                    console.log(shipArray[i].ship_id + " " + shipArray[i].ship_type)
                    let newrow = `("${shipArray[i].ship_id}", "${shipArray[i].ship_type}", ${shipArray[i].weight_kg === undefined || shipArray[i].weight_kg === null ? 0 : shipArray[i].weight_kg}," ${shipArray[i].home_port}", "${shipArray[i].ship_name}", ${shipArray[i].class === undefined || shipArray[i].class === null ? `"NA"` : `"${shipArray[i].class}"`})`
                    console.log(newrow);

                    if (i === length - 1) { sql = sql + newrow + " ; " } else { sql = sql + newrow + " , " }
                }
                try {
                    let dbres = await dbPool.query(sql);
                    console.log(dbres)
                    let data = await dbPool.query('SELECT * FROM ship');
                    return res.json({ rows: data })
                } catch (error) {
                    console.log(error)
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    else {
        return res.json({ rows: rows })
    }

})
module.exports = router
