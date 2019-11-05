
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

const ipfilter = require('express-ipfilter').IpFilter;
 
// Blacklist the following IPs
const ips = ['::1',':ffff:127.0.0.1','::ffff:127.0.0.1','::ffff:192.168.43.1'];

global.Promise = require('bluebird');

const jwt = require('jsonwebtoken');
const fs = require('fs');

var engine = require('ejs-blocks')
 
var ejs = require('ejs'); 

ejs.open = '{{';
ejs.close = '}}';

var session = require('express-session');

app.use(ipfilter(ips, { mode: 'allow' }));



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

app.use(bodyParser.json({limit: '999mb', extended: true}))
app.use(bodyParser.urlencoded({limit: '999mb', extended: true}))
//set folder public sebagai static folder untuk static file
app.use('/assets',express.static(__dirname + '/public'));
 
//route untuk homepage

var allzone = require('./routes/allzone');
var crud = require('./routes/crud'); 

app.use('/allzone',isAuthenticatedAllZone, allzone);
app.use('/crud', crud);
app.get('/logout',(req, res) => {
  req.session.destroy();	
  res.redirect('/');
});


app.get('/',(req, res) => {
 let privateKey = fs.readFileSync('./private.pem', 'utf8');
		let token = jwt.sign({ "body": "authorization" }, privateKey, { algorithm: 'HS256'});
	    req.session.name = "Console";
		req.session.author = "Console";
		req.session.allzone = token;
		app.locals.author = req.session.author;
		app.locals.Adminauthor = req.session.Adminauthor;
		app.locals.devauth = req.session.devauth;
		app.locals.name = req.session.name;
		app.locals.menu = req.session.menu;
		
		res.redirect('/allzone');
});

function isAuthenticatedAllZone(req, res, next) {
		let privateKey = fs.readFileSync('./private.pem', 'utf8');
		let token = jwt.sign({ "body": "authorization" }, privateKey, { algorithm: 'HS256'});
	    req.session.name = "Console";
		req.session.author = "Console";
		req.session.allzone = token;
		app.locals.author = req.session.author;
		app.locals.Adminauthor = req.session.Adminauthor;
		app.locals.devauth = req.session.devauth;
		app.locals.name = req.session.name;
		app.locals.menu = req.session.menu;
		next();
}
//server listening
app.listen(8088, () => {
  console.log('Server is running at port 8088');
});