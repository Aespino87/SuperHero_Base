const express = require("express");

const router = express.Router();

const hero = require("../models/hero.js");

router.get("/", function(req, res) {
    hero.all(function(data) {
        //This takes the data from the DB and pushes to the template.
        let hbsObject = {
            heroes: data
        };
        console.log(hbsObject);
        res.render("index", hbsObject);
    });
});
/// saves the data to the data base -- Creates new hero record
router.post("/api/heroes", function(req, res) {

    var heroName = req.body.hero_name;
    var onTeam = req.body.on_team;

    hero.create(
        ["hero_name", "on_team"],
        [heroName, onTeam],
        function(result) {
            res.json({
                id: result.insertId
        });
    });
});

// Updates the hero record in the database

router.put("/api/heroes/:id", function(req, res) {
    let condition = "id = " + req.params.id;

    console.log("condition", condition);

    hero.update (
        {
            hero_name: req.body.hero_name,
            on_team: req.body.on_team
        },
        condition,
        function(result) {
            if (result.modifiedRows == 0) {
                return res.status(404).end();
            } else {
                res.status(200).end();
            }
    });
});

router.delete("/api/heroes/:id", function(req, res) {
    let condition = "id = " + req.params.id;
    //Gives error 404 when no rows were changed.
    hero.delete(
        condition, 
        function(result) {
            if (result.affectedRows == 0) {
                return res.status(404).end();
            } else {
                res.status(200).end();
            }
        }
    );
});

module.exports = router;