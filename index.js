#!/usr/bin/env nodejs
var mysql = require('mysql');
var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
//var path = require('path');
var fs = require('fs');

var connection = mysql.createConnection({
	host     : 'localhost',
	user     : 'root',
	password : '12345',
	database : 'nodelogin'
});

var app = express();

app.set('view engine', 'pug');

app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

app.get('/', function(request, response) {
	//response.sendFile(path.join(__dirname + '/login.html'));
	response.render('index', { formTitle: 'Iniciar sesión'});
});

app.post('/auth', function(request, response) {
	global.username = request.body.username;
	var password = request.body.psw;

  	console.log(username);
	console.log(password);
	  
	if (username && password) {
		connection.query('SELECT * FROM accounts WHERE username = ? AND password = ?', [username, password], function(error, results, fields) {
			if (results.length > 0) {
				request.session.loggedin = true;
		request.session.username = username;
		console.log(username);

        fs.writeFile('table.json', JSON.stringify(results), function (err) {
        	if (err) throw err;
          console.log('Saved!');
        });
				
				response.redirect('./home')
			} else {
				response.render('authFail', { message: 'Usuario y/o contraseña incorrectas'});
			}			
			response.end();
		});
	} else {
		response.render('indexWarning', { formTitle: 'Iniciar sesión', message: 'No dejes los campos vacios!' });
		response.end();
	}
});

app.get('/home', function(request, response) {
	if (request.session.loggedin) {
		response.render('home', { message: request.session.username});
	} else {
		response.render('indexWarning', { formTitle: 'Iniciar sesión', message: 'Inicia sesión para ver esta página!' });
	}
	response.end();
});

app.listen(8080);
