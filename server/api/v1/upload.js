const express = require('express');
const router = express.Router();
const dbPool = require('./../../db');
const path = require('path')
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
var upload = multer({ storage: storage, fileFilter: function (req, file, cb) { checkFileType(file, cb) } }).single('file')
const checkFileType = (file, cb) => {
    // Allowed ext
    const filetypes = /jpeg|jpg|png/;
    // Check ext
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    // Check mime
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        console.log("not image")
        cb('Error: Images Only!');
    }
}
router.post('/',  function (req, res) {
    console.log("uploading")
    let id = req.query.id;
    console.log(id)
    let filename = null
    upload(req, res,async function (err) {
        if (err instanceof multer.MulterError) {
            return res.status(500).json(err)
        } else if (err) {
            return res.status(500).json(err)
        }
        console.log(req.file)
        filename = req.file.filename
        console.log(filename)
        // update the row and add the image name in the icon coloumn
        sql = `UPDATE ship  SET icon ="${filename}" WHERE id = "${id}";`
        console.log(sql)
        let rows = await dbPool.query(sql);
        return res.status(200).send(req.file)
    })


});
module.exports = router