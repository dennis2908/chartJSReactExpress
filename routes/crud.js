var express = require('express'),
    router = express.Router(),
    crud_zone = require('../controller/crud_zone');

router.get('/get_by_id', crud_zone.get_by_id);
router.get('/get_by_id_Admin', crud_zone.get_by_id_Admin);
router.get('/get_by_id_Guest', crud_zone.get_by_id_Guest);
router.post('/save_by_admin', crud_zone.save_by_admin);
router.post('/save', crud_zone.save);
module.exports = router;