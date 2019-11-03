
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

app.use(bodyParser.json({limit: '100mb', extended: true}))
app.use(bodyParser.urlencoded({limit: '100mb', extended: true}))
//set folder public sebagai static folder untuk static file
app.use('/assets',express.static(__dirname + '/public'));
 
//route untuk homepage

var zone6_only = require('./routes/zone6');
var crud = require('./routes/crud'); 

app.use('/zone6_only', zone6_only);
app.use('/crud', crud);
app.get('/logout',(req, res) => {
  req.session.destroy();	
  res.redirect('/');
});


app.get('/',(req, res) => {
  let privateKey = fs.readFileSync('./private.pem', 'utf8');
		let token = jwt.sign({ "body": "authorization" }, privateKey, { algorithm: 'HS256'});
		req.session.name = "Private";
		req.session.menu = '';
		req.session.author = "Guest";
		req.session.zone1 = token;
		app.locals.author = req.session.author;
		app.locals.Adminauthor = req.session.Adminauthor;
		app.locals.devauth = req.session.devauth;
		app.locals.name = req.session.name;
		app.locals.menu = req.session.menu;
		res.redirect('/zone6_only');
});

//server listening
app.listen(8086, () => {
  console.log('Server is running at port 8086');
});

app.on('uncaughtException', function (req, res, route, err) {
  log.info('******* Begin Error *******\n%s\n*******\n%s\n******* End Error *******', route, err.stack);
  if (!res.headersSent) {
    return res.send(500, {ok: false});
  }
  res.write('\n');
  res.end();
});