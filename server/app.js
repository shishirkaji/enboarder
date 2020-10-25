const dbPool = require('./db');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(function (req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header(
                "Access-Control-Allow-Methods",
                "GET, POST, PUT, DELETE"
        );
        res.header(
                "Access-Control-Allow-Headers",
                "Origin, X-Requested-With,x-auth-token, Content-Type, Accept"
        );
        next();
});
app.get('/', async (req, res) => {

        return res.json({ msg: "Server running!!" })
});

app.use('/api/v1/ship', require('./api/v1/ship'));
app.listen('4000');
console.log(`Listening on port: 4000, wait for the development server to be up...`);