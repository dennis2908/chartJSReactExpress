var express = require('express');
var router = express.Router();

router.get('/',(req, res, next) => {
      
	res.render('Zone1/index');
        
});
	
module.exports = router;