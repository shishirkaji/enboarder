const express = require('express');
const router = express.Router();
// const storage = require('./../../app')
const multer = require('multer')
// multer file storaage
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }
})
var upload = multer({ storage: storage }).single('file')

router.post('/', function (req, res) {
    console.log("uploading")
    upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            return res.status(500).json(err)
        } else if (err) {
            return res.status(500).json(err)
        }
        console.log(req.file)
        return res.status(200).send(req.file)

    })

});
module.exports = router