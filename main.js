
//use path module
const path = require('path');
//use express module
const express = require('express');
//use hbs view engine
const hbs = require('hbs');
//use bodyParser middleware
const bodyParser = require('body-parser');
//use mysql database
const app = express();



global.Promise = require('bluebird');

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
        expires: new Date(253402300000000)
		
  }
}));

	
app.use(express.static(__dirname + '/public'));
var cors = require('cors');

app.use(cors())

//set views file
app.set('views',path.join(__dirname,'views'));
//set view engine

app.engine('ejs', engine);
app.set('view engine', 'ejs');

app.use(bodyParser.json({limit: '999990mb', extended: true}))
app.use(bodyParser.urlencoded({limit: '999990mb', extended: true}))
//set folder public sebagai static folder untuk static file
app.use('/assets',express.static(__dirname + '/public'));
 
//route untuk homepage

var allzone = require('./routes/allzone'); 
var crud = require('./routes/crud'); 


app.get('/',isAuthenticatedAllZone,(req, res) => {
  res.render('AllZone/index.ejs');
});

app.use('/crud', crud);

app.get('/login',(req, res) => {
  res.render('Login/index.ejs');
});

app.get('/logout',(req, res) => {
  req.session.destroy();	
  res.redirect('/');
});
 

 
app.post('/login',(req, res) => {
	var username = req.body.username;
	var password = req.body.password;
	
	if(username=="console" && password=="myconsole")
	{
		req.session.username = username;
	}

	res.redirect('/');
});

app.post('/loginFrontEnd',(req, res) => {
	let username = req.body.username;
	let password = req.body.password;
	
	if(username=="console" && password=="myconsole")
	{
		res.json(username);
	}
	else{
	   res.json(false);	
	}
	
});

app.get('/logout',(req, res) => {
  req.session.destroy();	
  res.redirect('/');
});
  

function isAuthenticatedAllZone(req, res, next) {
	if (req.session.username) {
		next();
	} 
	else {
		res.redirect('/login');
	}
}

app.listen(process.env.PORT || 8000, function() {
    console.log('server running on port 8000', '');
});