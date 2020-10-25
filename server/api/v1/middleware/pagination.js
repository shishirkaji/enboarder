module.exports = (req, res, next) => {
    let { offset, limit } = req.query;
    if (!offset) {
        offset = 1;
    }
    req.offset = offset;
    next();
}
