//use path module
const path = require('path');
//use express module
const express = require('express');
//use hbs view engine
const hbs = require('hbs');
//use bodyParser middleware
const bodyParser = require('body-parser');
//use mysql database
const mysql = require('mysql');
const app = express();

const jwt = require('jsonwebtoken');
const fs = require('fs');

var engine = require('ejs-blocks')
 
var ejs = require('ejs'); 

 ejs.open = '{{'; 
 ejs.close = '}}';

var session = require('express-session');


app.use(session({
  secret: '32832113209138209132890oaejlkewjlkweqjlkweqjlkqewqewljkljk',
  resave: false,
  saveUninitialized: false,
  cookie: {
        expires: 600000
  }
}));


app.use(express.static(__dirname + '/public'));


var ejs = require('ejs'); 
 ejs.open = '{{'; 
 ejs.close = '}}';


//set views file
app.set('views',path.join(__dirname,'views'));
//set view engine

app.engine('ejs', engine);
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//set folder public sebagai static folder untuk static file
app.use('/assets',express.static(__dirname + '/public'));
 
//route untuk homepage

var zone1 = require('./routes/zone1'); 
var zone2 = require('./routes/zone2'); 
var zone3 = require('./routes/zone3'); 
var zone5 = require('./routes/zone5'); 
var zone6 = require('./routes/zone6'); 
var zone7 = require('./routes/zone7'); 

app.get('/',isAuthenticated,(req, res) => {
  res.render('Zone1/index.ejs');
});

app.use('/zone1', isAuthenticated, zone1);
app.use('/zone2', isAuthenticated, zone2);
app.use('/zone3', isAuthenticated, zone3);
app.use('/zone5', isAuthenticated, zone5);
app.use('/zone6', isAuthenticated, zone6);
app.use('/zone7', isAuthenticated, zone7);

app.get('/login',(req, res) => {
  res.render('Login/index.ejs');
});

app.get('/logout',isAuthenticated,(req, res) => {
  req.session.destroy();	
  res.redirect('/');
});
 

 
app.post('/loginto',(req, res) => {
	var username = req.body.username;
	var password = req.body.password;
	
	if(username=="etherus" && password=="12345")
	{
		let privateKey = fs.readFileSync('./private.pem', 'utf8');
		let token = jwt.sign({ "body": "authorization" }, privateKey, { algorithm: 'HS256'});
		req.session.loggedin = token;
		res.redirect('/');
	}
	else
	{
		res.redirect('/login');
	}
	
});
  
function isAuthenticated(req, res, next) {
if (req.session.loggedin) {
	next();
} else {
	res.redirect('/login');
}
}
 
//server listening
app.listen(8081, () => {
  console.log('Server is running at port 8081');
});