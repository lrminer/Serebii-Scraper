# Pocket-Updates
Donald Scraper

## What it does
Simple web scraper application
Utilizes npm cheerio (jQuery synstax) to target certain elements from a get request that responds with an HTML.
This application uses the website serebii.net, which is my favorite go to source for all pokemon updates.
Articles are sent as objects to the client in an array. 
At each indice, the contents of that object are appended to an article element created with jQuery and appended to a display.  
This application utilizes a MongoDB database.
The ORM of choice for this application is npm mongoose.
I also utilized the npm mongoose-unique-validator package as a plugin. This validates Schema to have unique values. Unfortunately at this time, mongoose does not have a unique validation option available built-in. This package accomplishes the job nicely.
Visitors to the website capable of publishing comments. These comments are associated with the articles. Comments are appended to the DOM underneath each article. 
When a new visitor comes to the site, the application sends a request to the server to scrape serebii.net for new articles that week. At most serebii will have 15 articles on their front page. 
