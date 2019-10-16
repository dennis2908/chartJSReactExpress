var express = require('express');
var router = express.Router();

router.get('/',(req, res, next) => {
      
	res.render('Zone1_Only/index');
        
});
	
module.exports = router;