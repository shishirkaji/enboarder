const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const dbPool = require('./../../db');
const axios = require('axios')
router.get('/search', async (req, res) => {
    console.log("search reached")
    console.log(req.query)
    let { type, homeport, weight } = req.query;
    if(!type && !weight && !homeport) return res.status(400).json({msg: "no query params"})
    let dbquerrystatement = `WHERE`
    if (type) dbquerrystatement = dbquerrystatement + ` type = "${type}" `;
    if (homeport && type) dbquerrystatement = dbquerrystatement + `AND`;
    if (homeport) dbquerrystatement = dbquerrystatement + ` homeport = "${homeport}" `;
    if (homeport || type) { if (weight) { dbquerrystatement = dbquerrystatement + `AND` } };
    if (weight) dbquerrystatement = dbquerrystatement + ` weight = ${weight}`;
    console.log(dbquerrystatement)
    let sql = `SELECT * FROM ship ${type || homeport || weight ? dbquerrystatement : ";"}`
    console.log(sql)
    let rows = await dbPool.query(sql);
    return res.json({ ships: rows })
})
router.get('/', async (req, res) => {
    let sql = `SELECT * FROM ship ;`
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
