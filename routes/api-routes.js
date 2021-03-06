const axios = require("axios");
const cheerio = require("cheerio");
const mongoose = require("mongoose");

const db = require("../models");
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/donaldscraper";

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true
});

module.exports = app => {
  app.get("/scrape", (req, res) => {
    axios.get("https://serebii.net").then(results => {
      // console.log(results.data);

      const $ = cheerio.load(results.data);

      $("div.post").each((i, element) => {
        const article = {};

        article.heading = $(element)
          .children("h2")
          .children("a")
          .text()
          .replace(/�/g, "é");
        // .replace(/Pok�mon/g, 'Pokémon')
        // .replace(/Pok�/g, 'Poké')

        article.link = $(element)
          .children("h2")
          .children("a")
          .attr("href");

        article.date = $(element)
          .children("p.info")
          .children("span.date")
          .text();

        article.image = $(element)
          .children("div.pics")
          .children("a")
          .children("img")
          .attr("src");

        article.description = $(element)
          .children("div.subcat")
          .children("p.title:first-of-type")
          .next()
          .text()
          .replace(/�/g, "é");

        article.subcatTitle = $(element)
          .children("div.subcat:first-of-type")
          .children("p.title")
          .text()
          .replace(/�/g, "é");


        // .replace(/Pok�mon/g, 'Pokémon')
        // .replace(/Pok�/g, 'Poké')
        // .replace(/Pokk�/g, 'Pokké')
        // .replace(/Anim�/g, 'Animé')

        db.Article.create(article)
          .then(dbArticle => {
            console.log(dbArticle);
          })
          .catch(err => {
            console.log(err);
          });
      });

      // res.json(results.data);
      res.json("Scrape Completed... Check /api/articles");
    });
  });
  app.get("/api/articles", (req, res) => {
    db.Article.find({}, function(err, data) {
      if (err) res.json(err);
      else res.json(data);
    });
  });

  app.get("/api/articles/:id", (req, res) => {
    const { id } = req.params;
    db.Article.find({
      _id: id
    })
      .populate("comments")
      .then(dbArticle => {
        res.json(dbArticle);
      });
  });

  app.post("/api/articles/:id", (req, res) => {
    db.Comment.create(req.body).then(dbComment => {
      console.log(dbComment);
      return db.Article.findByIdAndUpdate(
        req.params.id,
        {
          $push: {
            comments: {
              author: dbComment.author,
              subject: dbComment.subject,
              message: dbComment.message,
              date: dbComment.date
            }
          }
        },
        { new: true }
      ).then(dbArticle => {
        res.json(dbArticle);
      });
    });
  });
};
