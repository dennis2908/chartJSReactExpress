var express = require('express'),
    router = express.Router(),
    crud_zone = require('../controller/crud_zone');

router.get('/get_data1', crud_zone.get_data1);
router.get('/get_data2', crud_zone.get_data2);
module.exports = router;