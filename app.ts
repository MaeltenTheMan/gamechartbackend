var express = require("express");
var mysql = require("mysql");
var bodyParser = require("body-parser");
var cors = require('cors')
var app = express();


app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
})


app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
    extended: false
}));



var connection = mysql.createConnection({
    host: "localhost",
    user: "arndt",
    password: "smacks",
    database: "testdb"
});

connection.connect(function (error) {
    if (!!error) {
        console.log("Error");
        throw error;
    } else {
        console.log("Database connected");
    }
});


app.get("/getAllPlayer", cors(), function (req, res) {

    var sql = "SELECT * FROM player";

    connection.query(sql, function (error, rows, fields) {
        var response;
        if (!!error) {
            console.log("Error in the get Player Query");
            throw error;
        } else {
            console.log("success getting all Player");
            response = JSON.stringify(rows);
            res.send(JSON.parse(response));
        }
    });
});


app.get("/getAllTeams/:wettkampfid", cors(), function (req, res) {

    var wettkampfid = req.params.wettkampfid;

    console.log(wettkampfid);

    var sql = "SELECT * FROM team WHERE wettkampfid=" + wettkampfid;

    connection.query(sql, function (error, rows) {
        var response;
        if (!!error) {
            console.log("Error in the getTeamsquery");
            throw error;

        } else {
                console.log("success getting all Teams");
                response = JSON.stringify(rows);
                res.send(JSON.parse(response));
            }
        
    });
});


app.get("/getAllColors", cors(), function (req, res) {

    var sql = "SELECT * FROM color";

    connection.query(sql, function (error, rows, fields) {
        var response;
        if (!!error) {
            console.log("Error in the getColorquery");
            throw error;

        } else {
            console.log("success getting all Colors");
            response = JSON.stringify(rows);
            res.send(JSON.parse(response));
        }
    });
});

app.get("/getTournaments", cors(), function (req, res) {

    var sql = "SELECT * FROM wettkampf";

    connection.query(sql, function (error, rows) {
        var response;
        if (!!error) {
            console.log("Error in the getWettkampfquery");
            throw error;

        } else {
            console.log("success getting all Wettkampf");
            response = JSON.stringify(rows);
            res.send(JSON.parse(response));
        }
    });

});



app.get("/getAllGames/:wettkampfid", cors(), function (req, res) {

    var wettkampfid = req.params.wettkampfid;

    var sql = "SELECT * FROM game WHERE wettkampfid =" + wettkampfid;

    connection.query(sql, function (error, rows) {
        var response;
        if (!!error) {
            console.log("Error in the getGamesquery");
            throw error;

        } else {
            console.log("success getting all Games");
            response = JSON.stringify(rows);
            res.send(JSON.parse(response));
        }
    });
});


app.get("/getTeamByID/:id", function (req, res) {
    var teamID = req.params.id;

    var sql = "SELECT * FROM team WHERE id= " + teamID;

    connection.query(sql, function (error, row, fields) {
        if (!!error) {
            console.log("error getting Team");
        }
        else {
            console.log("success getting Team by ID");
            var response = JSON.stringify(row);
            res.send(JSON.parse(response));
        }
    })

});


app.get("/getPlayerByID/:id", function (req, res) {
    var playerID = req.params.id;

    var sql = "SELECT * FROM player WHERE id= " + playerID;

    connection.query(sql, function (error, row) {
        if (!!error) {
            console.log("error getting Player");
        }
        else {
            console.log("success getting Player by ID");
            var response = JSON.stringify(row);
            res.send(JSON.parse(response));
        }
    })

});

app.get("/getFirstPlace/:wettkampfid", cors(), function (req, res) {

    var wettkampfid = req.params.wettkampfid;

    var sql = "SELECT * FROM team WHERE wettkampfid=" + wettkampfid +" AND points = (SELECT MAX(points)FROM team)";

    connection.query(sql, function (error, row,) {
        if (!!error) {
            console.log("error getting biggest");
        }
        else {
            console.log("success getting biggest teampoints");
            var response = JSON.stringify(row);
            res.send(JSON.parse(response));
        }
    });
});

//creates new Team
app.post("/createTeam/:wettkampfid", cors(), function (req, res) {

    console.log(req.params.wettkampfid);

    var name = req.body.name;
    var motto = req.body.motto;
    var wettkampfid = req.params.wettkampfid

    var body = { name: name, motto: motto, wettkampfid: wettkampfid }

    var sql = "Insert into team (name, motto, wettkampfid) Values ('" + name + "' ,'" + motto + "' ,'" + wettkampfid + "' );";

    connection.query(sql, function (err, rows) {


        if (!!err) {
            throw err;
        } else {


            console.log("new team created");
            res.send(body);
        }
    });
});

//creates new Player
app.post("/createPlayer", cors(), function (req, res) {

    var firstname = req.body.firstname;
    var lastname = req.body.lastname;
    var description = req.body.description;
    var color = req.body.color;
    var picturesrc = "../assets/Pictures/" + firstname + "-" + lastname + ".jpg"
    var birthday = req.body.birthday;

    var body = { firstname: firstname, lastname: lastname, description: description, color: color, picturesrc: picturesrc, birthday: birthday }

    var sql = "Insert into player (firstname, lastname, description, color, picturesrc, birthday) Values ('"
        + firstname + "' ,'" + lastname + "' ,'" + description + "' ,'" + color + "' ,'" + picturesrc + "' ,'" + birthday + "' );";

    connection.query(sql, function (err, rows) {


        if (!!err) {
            throw err;
        } else {

            console.log("new player created");
            res.send(body);
        }
    });
});


app.post('/addPlayerToTeam/:teamID/:playerID', cors(), function(req, res){

    var playerID = req.params.playerID;
    var teamID = req.params.teamID;

    var sql="Insert into player_team (player_id, team_id) Values ('" + playerID + "','" + teamID + "');";

    connection.query(sql, function (error, rows) {
        if (!!error) {
            console.log("error in adding a Player to team")
            throw error;
        } else {
            console.log("Player addet");
            res.send(rows);
        }
    });

});


app.post('/newGame/:wettkampfid', cors(), function (req, res) {


    var name = req.body.name;
    var points = 100;
    var winner = req.body.winner.id;
    var silver = req.body.second.id;
    var bronze = req.body.third.id;
    var iron = req.body.fourth.id;
    var loser = req.body.fifth.id;
    var wettkampfid = req.params.wettkampfid;

    var sql = "Insert into game (name, points, winnerid, silverid, bronzeid, ironid, loserid, wettkampfid ) Values ('" +
        name + "' ,'" + points + "' ,'" + winner + "' ,'" + silver + "' ,'" + bronze + "' ,'"+ iron + "' ,'"  + loser + "' ,'" + wettkampfid + "' );";

    connection.query(sql, function (error, rows) {
        if (!!error) {
            console.log("error in creating a new Game")
            throw error;
        } else {
            console.log("created game");
            this.gameRows = rows;
        }
    });

    var winnerpoints = points * 0.45;
    var silverpoints = points * 0.25;
    var bronzepoints = points * 0.15;
    var ironpoints = points * 0.1;
    var loserpoints = points * 0.05;

    var teamsqls = new Array();
    teamsqls = [
        "UPDATE team SET points = points + " + winnerpoints + " WHERE id =" + winner,
        "UPDATE team SET points = points + " + silverpoints + " WHERE id =" + silver,
        "UPDATE team SET points = points + " + bronzepoints + " WHERE id =" + bronze,
        "UPDATE team SET points = points + " + ironpoints + " WHERE id =" + iron,
        "UPDATE team SET points = points + " + loserpoints + " WHERE id =" + loser
    ];

    for (var i = 0; i < teamsqls.length; i++) {
        connection.query(teamsqls[i], function (error, rows) {
            if (!!error) {
                console.log("error in adding points");
                throw error;
            } else {
                console.log("addet points");
                this.addrows = this.addrows + rows;
            }
        });
    }

    res.end(this.gameRows + this.addRows);
});

app.post('/createTournament', cors(), function (req, res) {

    var name = req.body.name;
    var newDatum = new Date();
    var datum = newDatum.toString();

    var typ = req.body.typ;


    var body = { name: name, datum: datum, typ: typ }

    var sql = "Insert into wettkampf (name, datum, typ) Values ('"
        + name + "' ,'" + datum + "' ,'" + typ + "' );";

    connection.query(sql, function (err, rows) {
        if (!!err) {
            throw err;
        } else {
            console.log("new wettkampf created");
            res.send(body);
        }
    });
})


app.post('/editPlayer/:id', cors(), function (req, res) {

    var id = req.params.id;
    var firstname = req.body.firstname;
    var lastname = req.body.lastname;
    var description = req.body.description;
    var birthday = req.body.birthday;
    var picturesrc = "../assets/Pictures/" + firstname + "-" + lastname + ".jpg";
    var color = req.body.color;


    var sql = "UPDATE player SET firstname = '"
        + firstname + "', lastname = '" + lastname + "', description = '" + description + "', birthday = '" + birthday + "', picturesrc = '" + picturesrc + "', color = '" + color + "' WHERE id =" + id;

    connection.query(sql, function (error, row) {
        if (!!error) {

            console.log("Error in editing Player query");
            throw error;
        } else {
            console.log("success editing Player");
            res.send(row);
        }
    })

});




app.post('/editTeam/:id', cors(), function (req, res) {
    var id = req.params.id;
    var name = req.body.name;
    var motto = req.body.motto;

    var sql = "UPDATE team SET name = '" + name + "', motto = '" + motto + "' WHERE id =" + id;

    connection.query(sql, function (error, row) {
        if (!!error) {
            console.log("Error in editing Team query");
        } else {
            console.log("success editing Team");
            res.send(row);
        }
    })


});

app.delete('/deleteGameById/:id/', cors(), function (req, res) {


    var sqlGetGame = "SELECT * FROM game WHERE id = " + req.params.id;

    connection.query(sqlGetGame, function (error, row, fields) {
        if (!!error) {
            console.log("Error in delete game query");
            throw error;

        } else {

            var points = row[0].points;
            var winner = row[0].winnerid;
            var silver = row[0].silverid;
            var bronze = row[0].bronzeid;
            var iron = row[0].ironid;
            var loser = row[0].loserid;

            console.log(winner, silver, bronze, iron, loser);

            var winnerpoints = points * 0.45;
            var silverpoints = points * 0.25;
            var bronzepoints = points * 0.15;
            var ironpoints = points * 0.1;
            var loserpoints = points * 0.05;

            var teamssqls = new Array();

            teamssqls = [
                "UPDATE team SET points = points - " + winnerpoints + " WHERE id =" + winner,
                "UPDATE team SET points = points - " + silverpoints + " WHERE id =" + silver,
                "UPDATE team SET points = points - " + bronzepoints + " WHERE id =" + bronze,
                "UPDATE team SET points = points - " + ironpoints + " WHERE id =" + iron,
                "UPDATE team SET points = points - " + loserpoints + " WHERE id =" + loser,
            ]

            for (var i = 0; i < teamssqls.length; i++) {
                console.log(teamssqls[i])
                connection.query(teamssqls[i], function (error, rows) {
                    if (!!error) {
                        console.log("Error in Subtractquery");
                        throw error;

                    } else {
                        console.log("success substracting Points");
                        this.subtractrows = this.subtractrows + rows;
                    }
                })
            }


            var sql = "DELETE From game WHERE id =" + req.params.id;



            connection.query(sql, function (error, rows) {
                if (!!error) {
                    console.log("Error in delete game query");
                    throw error;

                } else {
                    console.log("success deleting Game");
                    this.gameRows = rows;
                }
            })


            res.end(this.gameRows + this.subtractrows);

        }
    });
});


app.delete('/deleteTeamById/:id', function (req, res) {

    var sql = "DELETE From team WHERE id ='" + req.params.id + "'";

    connection.query(sql, function (error, rows) {
        if (!!error) {
            console.log("Error in deletequery");
            throw error;

        } else {
            console.log("success deleting Team");
            res.send(rows);
        }
    })

});


app.delete('/deletePlayerById/:id', function (req, res) {

    var sql = "DELETE From player WHERE id ='" + req.params.id + "'";

    connection.query(sql, function (error, rows) {
        if (!!error) {
            console.log("Error in delete Player query");
            throw error;

        } else {
            console.log("success deleting Player");
            res.send(rows);
        }
    })

});


app.listen(8080, function () {
    console.log("Server started on Port 8080")
});