# gamechartbackend
Nodejs api, game chart

Database:

color:
+----------+-------------+------+-----+---------+----------------+
| Field    | Type        | Null | Key | Default | Extra          |
+----------+-------------+------+-----+---------+----------------+
| id       | int(11)     | NO   | PRI | NULL    | auto_increment |
| name     | varchar(50) | NO   |     | NULL    |                |
| code     | varchar(50) | NO   |     | NULL    |                |
| charcode | varchar(50) | NO   |     | NULL    |                |
+----------+-------------+------+-----+---------+----------------+

game:
+----------+-------------+------+-----+---------+----------------+
| Field    | Type        | Null | Key | Default | Extra          |
+----------+-------------+------+-----+---------+----------------+
| id       | int(11)     | NO   | PRI | NULL    | auto_increment |
| name     | varchar(50) | NO   |     | NULL    |                |
| points   | int(11)     | NO   |     | NULL    |                |
| winnerid | int(11)     | NO   |     | NULL    |                |
| silverid | int(11)     | NO   |     | NULL    |                |
| bronzeid | int(11)     | NO   |     | NULL    |                |
| ironid   | int(11)     | NO   |     | NULL    |                |
| loserid  | int(11)     | NO   |     | NULL    |                |
+----------+-------------+------+-----+---------+----------------+

player:
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

team:

+-----------+-------------+------+-----+---------+----------------+
| Field     | Type        | Null | Key | Default | Extra          |
+-----------+-------------+------+-----+---------+----------------+
| id        | int(11)     | NO   | PRI | NULL    | auto_increment |
| name      | varchar(50) | NO   |     | NULL    |                |
| motto     | varchar(50) | NO   |     | NULL    |                |
| memberone | varchar(50) | NO   |     | NULL    |                |
| membertwo | varchar(50) | NO   |     | NULL    |                |
| points    | int(11)     | NO   |     | 0       |                |
+-----------+-------------+------+-----+---------+----------------+
