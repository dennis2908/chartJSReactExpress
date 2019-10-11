var express = require('express'),
    router = express.Router(),
    crud_zone = require('../controller/crud_zone');

router.get('/get_by_id', crud_zone.get_by_id);
router.post('/save', crud_zone.save);
module.exports = router;