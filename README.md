# gamechartbackend
Nodejs api, game chart

Database:

//Player Team Helper
create table player_team (player_id int(11) not null, team_id int(11) not null);

//Games
create table game (id int(11) not null auto_increment, name varchar(50) not null, points int(50) not null , winnerid int(50) not null
, silverid int(50) not null, bronzeid int(50) not null, ironid int(50) not null, loserid int(50) not null, wettkampfid int(50) not null, primary key ( id ));

//Tourneys
create table wettkampf (id int(11) not null auto_increment, name varchar(50) not null, datum DATE not null, typ varchar(50) not null, status int(11) default 1
, password varchar(50) not null, primary key ( id ));

//Players
create table player (id int(11) not null auto_increment, firstname varchar(50) not null, lastname varchar(50) not null, birthday DATE not null
, description varchar(50) not null, wins int(11) default 0, picturesrc varchar(50) not null, color int(11) not null , primary key ( id ));

//Teams
create table player (id int(11) not null auto_increment, name varchar(50) not null, motto varchar(50) not null,  points int(11) not null, wettkampfid int(11) not null, primary


+------------------+
| Tables_in_testdb |
+------------------+
| color            |
| game             |
| player           |
| player_team      |
| team             |
| wettkampf        |
+------------------+

//game
+-------------+-------------+------+-----+---------+----------------+
| Field       | Type        | Null | Key | Default | Extra          |
+-------------+-------------+------+-----+---------+----------------+
| id          | int(11)     | NO   | PRI | NULL    | auto_increment |
| name        | varchar(50) | NO   |     | NULL    |                |
| points      | int(11)     | NO   |     | NULL    |                |
| winnerid    | int(11)     | NO   |     | NULL    |                |
| silverid    | int(11)     | NO   |     | NULL    |                |
| bronzeid    | int(11)     | YES  |     | NULL    |                |
| ironid      | int(11)     | YES  |     | NULL    |                |
| loserid     | int(11)     | YES  |     | NULL    |                |
| wettkampfid | int(11)     | NO   |     | NULL    |                |
| status      | int(11)     | YES  |     | 1       |                |
+-------------+-------------+------+-----+---------+----------------+

//wettkampf
+----------+-------------+------+-----+---------+----------------+
| Field    | Type        | Null | Key | Default | Extra          |
+----------+-------------+------+-----+---------+----------------+
| id       | int(11)     | NO   | PRI | NULL    | auto_increment |
| name     | varchar(50) | NO   |     | NULL    |                |
| typ      | varchar(50) | NO   |     | NULL    |                |
| datum    | varchar(50) | NO   |     | NULL    |                |
| status   | int(11)     | NO   |     | NULL    |                |
+----------+-------------+------+-----+---------+----------------+

//player
+-------------+--------------+------+-----+---------+----------------+
| Field       | Type         | Null | Key | Default | Extra          |
+-------------+--------------+------+-----+---------+----------------+
| id          | int(11)      | NO   | PRI | NULL    | auto_increment |
| firstname   | varchar(50)  | NO   |     | NULL    |                |
| lastname    | varchar(50)  | NO   |     | NULL    |                |
| wins        | int(11)      | NO   |     | NULL    |                |
| description | varchar(100) | YES  |     | NULL    |                |
| birthday    | date         | YES  |     | NULL    |                |
| picturesrc  | varchar(50)  | NO   |     | NULL    |                |
| color       | int(11)      | NO   |     | NULL    |                |
+-------------+--------------+------+-----+---------+----------------+

//team
+-------------+-------------+------+-----+---------+----------------+
| Field       | Type        | Null | Key | Default | Extra          |
+-------------+-------------+------+-----+---------+----------------+
| id          | int(11)     | NO   | PRI | NULL    | auto_increment |
| name        | varchar(50) | NO   |     | NULL    |                |
| motto       | varchar(50) | NO   |     | NULL    |                |
| points      | int(11)     | NO   |     | 0       |                |
| wettkampfid | int(11)     | NO   |     | NULL    |                |
+-------------+-------------+------+-----+---------+----------------+
