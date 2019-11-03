
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

var mysql = require('mysql'),
    connection = require('express-myconnection'),
    config = {
      host: 'localhost',
      user: 'root',
      password: '',
      port: 3306,
      database: 'etherus_zone'
};

app.use(connection(mysql, config, 'request'));		
	
app.use(express.static(__dirname + '/public'));


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
var allzone_hostess = require('./routes/allzone_hostess'); 
var zone1 = require('./routes/zone1'); 
var zone2 = require('./routes/zone2'); 
var zone3 = require('./routes/zone3'); 
var zone4 = require('./routes/zone4'); 
var zone5 = require('./routes/zone5'); 
var zone6 = require('./routes/zone6'); 
var zone7 = require('./routes/zone7'); 
var zone1_only = require('./routes/zone1');
var zone2_only = require('./routes/zone2');
var zone3_only = require('./routes/zone3');
var zone4_only = require('./routes/zone4');
var zone5_only = require('./routes/zone5');
var zone6_only = require('./routes/zone6');
var zone7_only = require('./routes/zone7');
var crud = require('./routes/crud'); 

process.on('unhandledRejection', (error, promise) => {
  console.log(' Oh Lord! We forgot to handle a promise rejection here: ', promise);
  console.log(' The error was: ', error );
});

app.use('/allzone', isAuthenticatedAllZone, allzone);
app.use('/allzone_hostess', isAuthenticatedAllZoneHostess, allzone_hostess);
app.use('/zone1', isAuthenticated, zone1);
app.use('/zone2', isAuthenticated, zone2);
app.use('/zone3', isAuthenticated, zone3);
app.use('/zone4', isAuthenticated, zone4);
app.use('/zone5', isAuthenticated, zone5);
app.use('/zone6', isAuthenticated, zone6);
app.use('/zone7', isAuthenticated, zone7);
app.use('/zone1_only',isAuthenticatedZone1, zone1_only);
app.use('/zone2_only',isAuthenticatedZone2, zone2_only);
app.use('/zone3_only', zone3_only);
app.use('/zone4_only', isAuthenticatedZone4, zone4_only);
app.use('/zone5_only', isAuthenticatedZone5, zone5_only);
app.use('/zone6_only', isAuthenticatedZone6, zone6_only);
app.use('/zone7_only', isAuthenticatedZone7, zone7_only);
app.use('/crud', crud);

app.get('/login',(req, res) => {
  res.render('Login/index.ejs');
});

app.get('/logout',isAuthenticated,(req, res) => {
  req.session.destroy();	
  res.redirect('/');
});


app.get('/',(req, res) => {
  let privateKey = fs.readFileSync('./private.pem', 'utf8');
		let token = jwt.sign({ "body": "authorization" }, privateKey, { algorithm: 'HS256'});
		req.session.name = "Private";
		req.session.menu = '';
		req.session.author = "Guest";
		app.locals.author = req.session.author;
		app.locals.Adminauthor = req.session.Adminauthor;
		app.locals.devauth = req.session.devauth;
		app.locals.menu = req.session.menu;
		app.locals.name = req.session.name;
		res.redirect('/zone3_only');
});

 
app.post('/loginto',(req, res) => {
	var username = req.body.username;
	var password = req.body.password;
	req.session.admin = 0;
	
	if(username=="console" && password=="myconsole")
	{
		let privateKey = fs.readFileSync('./private.pem', 'utf8');
		let token = jwt.sign({ "body": "authorization" }, privateKey, { algorithm: 'HS256'});
	    req.session.name = "Console";
		req.session.author = "Console";
		req.session.allzone = token;
		res.redirect('/allzone');
	}
	
	/*
	else if(username=="hostess" && password=="thehostess")
	{
		let privateKey = fs.readFileSync('./private.pem', 'utf8');
		let token = jwt.sign({ "body": "authorization" }, privateKey, { algorithm: 'HS256'});
	    req.session.name = "Console";
		req.session.author = "Console";
		req.session.Adminauthor = 'Console';
		req.session.allzoneHostess = token;
		res.redirect('/allzone_hostess');
	}
	*/
	
	else if(username=="etherus" && password=="12345")
	{
		let privateKey = fs.readFileSync('./private.pem', 'utf8');
		let token = jwt.sign({ "body": "authorization" }, privateKey, { algorithm: 'HS256'});
	    req.session.name = "Admin";
		req.session.author = "Admin";
		req.session.Adminauthor = 'Admin';
		req.session.menu = '_';
		req.session.loggedin = token;
		res.redirect('/zone1');
	}
	/*
	else if(username=="guest" && password=="guest")
	{
		let privateKey = fs.readFileSync('./private.pem', 'utf8');
		let token = jwt.sign({ "body": "authorization" }, privateKey, { algorithm: 'HS256'});
		req.session.name = "Guest";
		req.session.menu = '_';
		req.session.author = "Guest";
		req.session.loggedin = token;
		res.redirect('/');
	}
	*/
	else if(username=="zone1" && password=="11111")
	{
		let privateKey = fs.readFileSync('./private.pem', 'utf8');
		let token = jwt.sign({ "body": "authorization" }, privateKey, { algorithm: 'HS256'});
		req.session.name = "Private";
		req.session.menu = '';
		req.session.author = "Guest";
		req.session.zone1 = token;
		res.redirect('/zone1_only');
	}
	else if(username=="zone2" && password=="22222")
	{
		let privateKey = fs.readFileSync('./private.pem', 'utf8');
		let token = jwt.sign({ "body": "authorization" }, privateKey, { algorithm: 'HS256'});
		req.session.name = "Private";
		req.session.menu = '';
		req.session.author = "Guest";
		req.session.zone2 = token;
		res.redirect('/zone2_only');
	}
	else if(username=="zone3" && password=="33333")
	{
		let privateKey = fs.readFileSync('./private.pem', 'utf8');
		let token = jwt.sign({ "body": "authorization" }, privateKey, { algorithm: 'HS256'});
		req.session.name = "Private";
		req.session.menu = '';
		req.session.author = "Guest";
		req.session.zone3 = token;
		res.redirect('/zone3_only');
	}
	else if(username=="zone4" && password=="44444")
	{
		let privateKey = fs.readFileSync('./private.pem', 'utf8');
		let token = jwt.sign({ "body": "authorization" }, privateKey, { algorithm: 'HS256'});
		req.session.name = "Private";
		req.session.menu = '';
		req.session.author = "Guest";
		req.session.zone4 = token;
		res.redirect('/zone4_only');
	}
	else if(username=="zone5" && password=="55555")
	{
		let privateKey = fs.readFileSync('./private.pem', 'utf8');
		let token = jwt.sign({ "body": "authorization" }, privateKey, { algorithm: 'HS256'});
		req.session.name = "Private";
		req.session.menu = '';
		req.session.author = "Guest";
		req.session.zone5 = token;
		res.redirect('/zone5_only');
	}
	else if(username=="zone6" && password=="66666")
	{
		let privateKey = fs.readFileSync('./private.pem', 'utf8');
		let token = jwt.sign({ "body": "authorization" }, privateKey, { algorithm: 'HS256'});
		req.session.name = "Private";
		req.session.menu = '';
		req.session.author = "Guest";
		req.session.zone6 = token;
		res.redirect('/zone6_only');
	}
	else if(username=="zone7" && password=="77777")
	{
		let privateKey = fs.readFileSync('./private.pem', 'utf8');
		let token = jwt.sign({ "body": "authorization" }, privateKey, { algorithm: 'HS256'});
		req.session.name = "Private";
		req.session.menu = '';
		req.session.author = "Guest";
		req.session.zone7 = token;
		res.redirect('/zone7_only');
	}
	
});
  
function isAuthenticated(req, res, next) {
	if (req.session.loggedin) {
		app.locals.author = req.session.author;
		app.locals.Adminauthor = req.session.Adminauthor;
		app.locals.devauth = req.session.devauth;
		app.locals.name = req.session.name;
		app.locals.menu = req.session.menu;

		next();
	} 
	else {
		res.redirect('/login');
	}
}

function isAuthenticatedAllZone(req, res, next) {
	if (req.session.allzone) {
		app.locals.author = req.session.author;
		app.locals.devauth = req.session.devauth;
		app.locals.name = req.session.name;
		app.locals.menu = req.session.menu;
		next();
	} 
	else {
		res.redirect('/login');
	}
}

function isAuthenticatedAllZoneHostess(req, res, next) {
	if (req.session.allzoneHostess) {
		app.locals.author = req.session.author;
		app.locals.Adminauthor = req.session.Adminauthor;
		app.locals.devauth = req.session.devauth;
		app.locals.name = req.session.name;
		app.locals.menu = req.session.menu;

		next();
	} 
	else {
		res.redirect('/login');
	}
}

function isAuthenticatedZone1(req, res, next) {
	if (req.session.zone1) {
		app.locals.author = req.session.author;
		app.locals.Adminauthor = req.session.Adminauthor;
		app.locals.devauth = req.session.devauth;
		app.locals.name = req.session.name;
		app.locals.menu = req.session.menu;
		next();
	} 
	else {
		res.redirect('/login');
	}
}

function isAuthenticatedZone2(req, res, next) {
	if (req.session.zone2) {
		app.locals.author = req.session.author;
		app.locals.Adminauthor = req.session.Adminauthor;
		app.locals.devauth = req.session.devauth;
		app.locals.menu = req.session.menu;
		app.locals.name = req.session.name;
		next();
	} 
	else {
		res.redirect('/login');
	}
}

function isAuthenticatedZone3(req, res, next) {
	if (req.session.zone3) {
		app.locals.author = req.session.author;
		app.locals.Adminauthor = req.session.Adminauthor;
		app.locals.devauth = req.session.devauth;
		app.locals.menu = req.session.menu;
		app.locals.name = req.session.name;
		next();
	} 
	else {
		res.redirect('/login');
	}
}

function isAuthenticatedZone4(req, res, next) {
	if (req.session.zone4) {
		app.locals.author = req.session.author;
		app.locals.Adminauthor = req.session.Adminauthor;
		app.locals.devauth = req.session.devauth;
		app.locals.menu = req.session.menu;
		app.locals.name = req.session.name;
		next();
	} 
	else {
		res.redirect('/login');
	}
}

function isAuthenticatedZone5(req, res, next) {
	if (req.session.zone5) {
		app.locals.author = req.session.author;
		app.locals.Adminauthor = req.session.Adminauthor;
		app.locals.devauth = req.session.devauth;
		app.locals.menu = req.session.menu;
		app.locals.name = req.session.name;
		next();
	} 
	else {
		res.redirect('/login');
	}
}

function isAuthenticatedZone6(req, res, next) {
	if (req.session.zone6) {
		app.locals.author = req.session.author;
		app.locals.Adminauthor = req.session.Adminauthor;
		app.locals.devauth = req.session.devauth;
		app.locals.menu = req.session.menu;
		app.locals.name = req.session.name;
		next();
	} 
	else {
		res.redirect('/login');
	}
}

function isAuthenticatedZone7(req, res, next) {
	if (req.session.zone7) {
		app.locals.author = req.session.author;
		app.locals.Adminauthor = req.session.Adminauthor;
		app.locals.devauth = req.session.devauth;
		app.locals.menu = req.session.menu;
		app.locals.name = req.session.name;
		next();
	} 
	else {
		res.redirect('/login');
	}
}

//server listening
app.listen(8083, () => {
  console.log('Server is running at port 8083');
});

app.on('uncaughtException', function (req, res, route, err) {
  log.info('******* Begin Error *******\n%s\n*******\n%s\n******* End Error *******', route, err.stack);
  if (!res.headersSent) {
    return res.send(500, {ok: false});
  }
  res.write('\n');
  res.end();
});