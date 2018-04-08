const express = require('express');
const router = express.Router();

const algoliasearch = require('algoliasearch');
const client = algoliasearch('EZIQQ02IPH', '41c115a39373433ed839d4a2924f9fdb');
const index = client.initIndex('mean-commerce');


router.get('/', (req, res, next) => {
    if (req.query.query) {
        index.search({
            query: req.query.query,
            page: req.query.page
        }, (err, content) => {
            res.json({
                success: true,
                message: 'j made a search',
                content: content,
                search_result: req.query.query
            })
        })
    }
})


module.exports = router;