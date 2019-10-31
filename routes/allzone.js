var express = require('express');
var router = express.Router();

router.get('/',(req, res, next) => {
      
	res.header('Cache-Control', 'no-cache, no-store, must-revalidate')  
	res.render('AllZone/index');
        
});
	
module.exports = router;