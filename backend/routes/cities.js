const express = require('express');
const router = express.Router();
const { getCities, getActivities } = require('../controllers/cityController');

router.get('/', getCities);
router.get('/activities', getActivities);

module.exports = router;
