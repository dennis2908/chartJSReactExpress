var express = require('express');
var router = express.Router();
 
/* GET home page. */
router.get('/',(req, res, next) => {
      
	res.render('Zone2/index.ejs');
        
});
	
	
 
module.exports = router;