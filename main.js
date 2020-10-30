
//use path module
const path = require('path');
//use express module
const express = require('express');
//use bodyParser middleware
const bodyParser = require('body-parser');
//use mysql database
const app = express();



const jwt = require('jsonwebtoken');
const fs = require('fs');

var engine = require('ejs-blocks')
 
var ejs = require('ejs'); 

ejs.open = '{{';
ejs.close = '}}';

var session = require('express-session');

app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: '32832113209138209132890oaejlkewjlkweqjlkweqjlkqewqewljkljk',
  resave: false,
  saveUninitialized: true,
  cookie: {
        expires: new Date(253402300000000),
		secure: true 
		
  }
}));

	
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
var crud = require('./routes/crud'); 


app.get('/',isAuthenticatedAllZone,(req, res) => {
  res.render('allzone/index.ejs');
});

app.use('/crud', crud);

app.get('/login',(req, res) => {
  res.render('Login/index.ejs');
});

app.get('/logout',(req, res) => {
  req.session.destroy();	
  res.redirect('/');
});
 

 
app.post('/loginto',(req, res) => {
	var username = req.body.username;
	var password = req.body.password;
	
	if(username=="console" && password=="myconsole")
	{
	    req.session.name = "Console";
		res.redirect('/');
	}

});
  

function isAuthenticatedAllZone(req, res, next) {
	if (req.session.name) {
		next();
	} 
	else {
		res.redirect('/login');
	}
}

app.listen(process.env.PORT || 3000, function() {
    console.log('server running on port 3000', '');
});

	