const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();

app.use(cors());
app.use(bodyparser.json());



//database connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'lpi',
    port: 3306

});

//check database connection
db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Mysql connected');
});





//user info
app.get('/users', (req, res) => {
    db.query('SELECT * FROM authors', (err, results) => {
        if (err) {
            throw err;
        }
        if (results.length === 0) {
            res.status(404).send('Users not found');
        } else {
            res.json(results);
        }
    });
});

app.get('/users/:id', (req, res) => {
    db.query('SELECT * FROM authors WHERE id = ?', [req.params.id], (err, results) => {
        if (err) {
            throw err;
        }

        if (results.length === 0) {
            res.status(404).send('User not found');
        } else {
            res.json(results);
        }

    });
});


app.get('/posts', (req, res) => {
    db.query('SELECT YEAR(date) as ano ,count(*) as total FROM posts GROUP BY YEAR(date)', (err, results) => {
        if (err) {
            throw err;
        }
        if (results.length === 0) {
            res.status(404).send('Users not found');
        } else {
            res.json(results);
        }
    });
});

//get all database tables
app.get('/tables', (req, res) => {
    db.query('SHOW TABLES', (err, results) => {
        if (err) {
            throw err;
        }
        if (results.length === 0) {
            res.status(404).send('Tables not found');
        } else {
            var tables = [];
            for (var i = 0; i < results.length; i++) {
                tables.push(results[i]['Tables_in_lpi']);
            }
            res.json(tables);
        }
    });
});

//get all database columns
app.get('/columns/:table', (req, res) => {
    db.query('SHOW COLUMNS FROM ' + req.params.table, (err, results) => {
        if (err) {
            throw err;
        }
        if (results.length === 0) {
            res.status(404).send('Columns not found');
        } else {
            var columns = [];
            for (var i = 0; i < results.length; i++) {
                columns.push(results[i].Field);
            }
            res.json(columns);
        }
    });
});

//get info from table x
app.get('/table/:table', (req, res) => {
    db.query('SELECT * FROM ' + req.params.table, (err, results) => {
        if (err) {
            throw err;
        }
        if (results.length === 0) {
            res.status(404).send('Table not found');
        } else {
            res.json(results);
        }
    });
});



app.post('/query', (req, res) => {
    let sql = req.body.sql;
    //sql = sql.split(' ');
    console.log(sql);

    //if (sql[0] === 'SELECT') {

        db.query(sql, (err, results) => {
            if (err) {
                throw err;
            }
            res.json(results);
        });
    //} else {
    //    res.send('Not a SELECT query');
    //}
});

//get info from db by query
app.get('/query/:query', (req, res) => {
    let sql = req.params.query;
    db.query(sql, (err, results) => {
        if (err) {
            throw err;
        }
        if (results.length === 0) {
            res.status(404).send('Query not found');
        } else {
            res.json(results);
        }
    });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});