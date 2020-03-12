//This helps create the interactions with the database

const orm = require("../config/orm.js");

const hero = {
    all: function(cb) {
        orm.all("heroes", function(res) {
            cb(res);
        });
    },

    create: function(cols, vals, cb) {
        orm.create("heroes", cols, vals, function(res){cb(res);
        });
    },
    
    update: function(objColVals, condition, cb) {
        orm.update("heroes", objColVals, condition, function(res){cb(res);
        });
    },
    delete: function(condition, cb) {
        orm.delete("heroes", condition, function(res){cb(res);
        });
    }
};

module.exports = hero;