var express = require("express");
var mysql = require("mysql");
var bodyParser = require("body-parser");
var cors = require('cors')
var app = express();


app.use(function(req, res, next){
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

connection.connect(function(error){
    if(!!error){
        console.log("Error");
    } else {
        console.log("Database connected");
    }
});


//creates new Member
app.post("/createTeam",cors(),function(req, res){
 
    var name = req.body.name;
    var motto = req.body.motto;
    var memberone = req.body.memberone;
    var membertwo = req.body.membertwo;

    var body = {name: name,motto:motto,memberone:memberone,membertwo:membertwo}

    var sql = "Insert into team (name, motto, memberone, membertwo) Values ('" + name + "' ,'" + motto  +"' ,'" + memberone + "' ,'" + membertwo +"' );";

    connection.query(sql, function(err, rows,fields){
        var response;

        if(err){
            throw err;
        } else {
            
            response = JSON.stringify(rows);
            console.log("new line created");
            res.send(body);
        }
    });
});


app.get("/getAllTeams", cors(), function(req,res){
    
    connection.query("SELECT * FROM team", function(error, rows, fields){
        var response;
        if(!!error){
            console.log("Error in the getTeamsquery");
            throw error;
            
        } else {
            console.log("success getting all Teams");
            response =  JSON.stringify(rows);
            res.send(JSON.parse(response));
        }
    });
});

app.get("/getAllGames", cors(), function(req,res){
    
    connection.query("SELECT * FROM game", function(error, rows, fields){
        var response;
        if(!!error){
            console.log("Error in the getGamesquery");
            throw error;
            
        } else {
            console.log("success getting all Games");
            response =  JSON.stringify(rows);
            res.send(JSON.parse(response));
        }
    });
});


app.get("/getTeamByID/:id", function(req,res){
    var teamID = req.params.id;

    var sql = "SELECT * FROM team WHERE id= " + teamID;
    
    connection.query(sql, function(error, row, fields){
        if(!!error){
            console.log("error getting biggest");
        }
        else {
            console.log("success getting Team by ID");
            var response = JSON.stringify(row);
            res.send(JSON.parse(response));
        }
    })

});

app.get("/getFirstPlace",cors(), function(req, res){
    var sql = "SELECT * FROM team WHERE points = (SELECT MAX(points)FROM team)";

    connection.query(sql, function(error, row, fields){
        if(!!error){
            console.log("error getting biggest");
        }
        else {
            console.log("success getting biggest teampoints");
            var response =  JSON.stringify(row);
            res.send(JSON.parse(response));
        }
    });
});

app.post('/newGame', cors(), function(req,res){


    var name = req.body.name;
    var points = 100;/* req.body.points;*/
    var winner = req.body.winner.id;
    var silver = req.body.second.id;
    var bronze = req.body.third.id;
    var iron = req.body.fourth.id;
    var loser = req.body.fifth.id;

    var sql = "Insert into game (name, points, winnerid, silverid, bronzeid, ironid, loserid) Values ('" +
    name + "' ,'" + points  + "' ,'" + winner + "' ,'" + silver  + "' ,'" + bronze  + "' ,'" + iron  + "' ,'" + loser  + "' );"; 

    connection.query(sql, function(error,rows,fields){
        if(!!error){
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
        "UPDATE team SET points = points + " +  winnerpoints + " WHERE id =" + winner,
        "UPDATE team SET points = points + " +  silverpoints + " WHERE id =" + silver,
        "UPDATE team SET points = points + " +  bronzepoints + " WHERE id =" + bronze,
        "UPDATE team SET points = points + " +  ironpoints + " WHERE id =" + iron,
        "UPDATE team SET points = points + " +  loserpoints + " WHERE id =" + loser
    ];

    for(var i = 0; i<teamsqls.length; i++ ){
    connection.query(teamsqls[i], function(error,rows,fields){
        if(!!error){
            console.log("error in adding points");
            throw error;
        } else {
            console.log("addet points");
            this.addrows = this.addrows +  rows;
        }
    });
}

    res.end(this.gameRows + this.addRows);
});


app.delete('/deleteGameById/:id/',cors(), function(req, res){

    var points;
    var winner;
    var silver;
    var bronze;
    var iron; 
    var loser;


    var sqlGetGame = "SELECT * FROM game WHERE id = " + req.params.id;

    connection.query(sqlGetGame, function(error, row, fields){
        if(!!error){
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
                "UPDATE team SET points = points - " +  winnerpoints + " WHERE id =" + winner,
                "UPDATE team SET points = points - " +  silverpoints + " WHERE id =" + silver,
                "UPDATE team SET points = points - " +  bronzepoints + " WHERE id =" + bronze,
                "UPDATE team SET points = points - " +  ironpoints + " WHERE id =" + iron,
                "UPDATE team SET points = points - " +  loserpoints + " WHERE id =" + loser,
            ]

            for(var i = 0; i<teamssqls.length; i++ ){
                console.log(teamssqls[i])
                connection.query(teamssqls[i], function(error, rows, fields){
            if(!!error){
                console.log("Error in Subtractquery");
                throw error;
                        
            } else {
                        console.log("success substracting Points");
                this.subtractrows = this.subtractrows +  rows;   
            }
        })
    }


    var sql = "DELETE From game WHERE id =" + req.params.id;

    

    connection.query(sql, function(error, rows, fields){
        if(!!error){
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

/*     

    var points = req.body.points;
    var winner = req.body.winner.id;
    var silver = req.body.second.id;
    var bronze = req.body.third.id;
    var iron = req.body.fourth.id;
    var loser = req.body.fifth.id;
 */
   /*  var winnerpoints = points * 0.45;
    var silverpoints = points * 0.25;
    var bronzepoints = points * 0.15;
    var ironpoints = points * 0.1;
    var loserpoints = points * 0.05;

    var sql = "DELETE From game WHERE id =" + req.params.id;

    

    connection.query(sql, function(error, rows, fields){
        if(!!error){
            console.log("Error in delete game query");
            throw error;
            
        } else {
            console.log("success deleting Game");
            this.gameRows = rows;
        }
    })

    var teamssqls = new Array();

    this.teamssqls = [
        "UPDATE team SET points = points - " +  winnerpoints + " WHERE id =" + winner,
        "UPDATE team SET points = points - " +  silverpoints + " WHERE id =" + silver,
        "UPDATE team SET points = points - " +  bronzepoints + " WHERE id =" + bronze,
        "UPDATE team SET points = points - " +  ironpoints + " WHERE id =" + iron,
        "UPDATE team SET points = points - " +  loserpoints + " WHERE id =" + loser,
    ]

    for(var i = 0; i<this.teamsqls.length; i++ ){
        connection.query(teamssqls, function(error, rows, fields){
            if(!!error){
                console.log("Error in Subtractquery");
                throw error;
                
            } else {
                console.log("success substracting Points");
                this.subtractrows = this.subtractrows +  rows;   
            }
        })
    }
    res.end(this.gameRows + this.subtractrows);
 */
});


app.delete('/deleteTeamById/:id', function(req, res){

    var sql = "DELETE From team WHERE id ='" + req.params.id + "'";

    connection.query(sql, function(error, rows, fields){
        if(!!error){
            console.log("Error in deletequery");
            throw error;
            
        } else {
            console.log("success deleting Team");
            res.send(rows);
        }
    })

});


app.listen(8080, function(){
    console.log("Server started on Port 8080")
});