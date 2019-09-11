const axios = require('axios');
const cheerio = require('cheerio');
const mongoose = require('mongoose');

const db = require('../models');

mongoose.connect("mongodb://localhost/donaldscraper", {
    useNewUrlParser: true
})

module.exports = (app) => {
    app.get('/scrape', (req, res) => {
        axios.get('https://serebii.net').then(results => {
            // console.log(results.data);

            const $ = cheerio.load(results.data);

            $('div.post').each((i, element) => {
                const article = {};

                article.heading = $(element)
                    .children('h2')
                    .children('a')
                    .text()
                    .replace(/�/g, 'é')
                    .replace(/Pok�mon/g, 'Pokémon')
                    .replace(/Pok�/g, 'Poké');

                article.link = $(element)
                    .children('h2')
                    .children('a')
                    .attr('href');

                article.date = $(element)
                    .children('p.info')
                    .children('span.date')
                    .text();

                article.image = $(element)
                    .children('div.pics')
                    .children('a')
                    .children('img')
                    .attr('src');

                article.description = $(element)
                    .children('div.subcat')
                    .children('p')
                    .text()
                    .replace(/�/g, 'é')
                    .replace(/Pok�mon/g, 'Pokémon')
                    .replace(/Pok�/g, 'Poké')
                    .replace(/Pokk�/g, 'Pokké')
                    .replace(/Anim�/g, 'Animé');

                db.Article.create(article)
                    .then(dbArticle => {
                        console.log(dbArticle);

                    })
                    .catch(err => {
                        console.log(err)
                    })
            })

            // res.json(results.data);
            res.json('Scrape Completed... Check /api/articles');
        })

    })
    app.get('/api/articles', (req, res) => {
        db.Article.find({}, function (err, data) {
            if (err) res.json(err);
            else res.json(data);
        })

    })
}