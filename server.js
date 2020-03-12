// Load dotenv environment variables
require('dotenv').config()

const path = require('path');
const express = require("express");

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.static("public"));

//addEventListener.use(express.encodedurl({ extended: true }));
app.use(express.json());

const exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({
    defaultLayout: "main",
    helpers: {
        stringifyJson: function(jsonObject) {
            return JSON.stringify(jsonObject);
        }
    }
}));
app.set("view engine", "handlebars");

const routes = require ("./controllers/heroes_controller.js");

app.use(routes);

app.listen(PORT, function() {
    console.log("Server is listening on: http://localhost:" + PORT);
});