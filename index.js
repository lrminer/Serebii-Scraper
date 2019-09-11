const express = require('express');

const app = express();

const PORT = process.env.PORT || 1000;

// Middleware
app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());
app.use(express.static('public'));

// routes
require('./routes/api-routes')(app);
require('./routes/html-routes')(app);

// listen event 
const server = app.listen(PORT, () => {
    console.log('listening on port' + PORT + "\nhttp://localhost:" + PORT);
});