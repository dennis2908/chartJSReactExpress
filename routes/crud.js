var express = require('express'),
    router = express.Router(),
    crud_zone = require('../controller/crud_zone');

router.get('/get_by_id', crud_zone.get_by_id);
router.get('/get_by_id_Admin', crud_zone.get_by_id_Admin);
router.get('/get_by_id_Guest', crud_zone.get_by_id_Guest);
router.get('/get_data1', crud_zone.get_data1);
router.get('/get_data2', crud_zone.get_data2);
router.post('/save_by_admin', crud_zone.save_by_admin);
router.post('/save', crud_zone.save);
module.exports = router;