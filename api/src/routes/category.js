const server = require('express')
const router = server.Router();
const { Category } = require('../db.js');

router.get('/', async (req, res, next) => {
    try {
        const categories = await Category.findAll()
        res.json(categories);
    } catch (e) {
        res.status(500).send({
            message: 'There has been an error'
        });
        next(e);
    }
})

module.exports = router;
