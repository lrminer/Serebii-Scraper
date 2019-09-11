const axios = require('axios');
const cheerio = require('cheerio');

const db = require('../models');

module.exports = (app) => {
    app.get('/scrape', (req, res) => {
        axios.get('https://serebii.net').then(results => {
            console.log(results.data);

            const $ = cheerio.load(results.data);

            $('')

            res.json(results.data);
        })
    })
}