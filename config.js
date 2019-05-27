
/**
 *   `movies`  TABLE SCHEMA
 * +-----------------+-------------+------+-----+---------+-------+
| Field           | Type        | Null | Key | Default | Extra |
+-----------------+-------------+------+-----+---------+-------+
| id              | int(11)     | NO   | PRI | NULL    |       |
| name            | varchar(100)| NO   |     | NULL    |       |
| isAdult         | tinyint(1)  | NO   |     | NULL    |       |
| release_date    | date        | NO   |     | NULL    |       |
+-----------------+-------------+------+-----+---------+-------+
*/

const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'company',
});

module.exports = connection;