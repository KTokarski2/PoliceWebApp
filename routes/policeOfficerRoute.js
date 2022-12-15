const express = require('express');
const router = express.Router();
const policeOfficerController = require('../controllers/policeOfficerController');

router.get('/', policeOfficerController.showPoliceOfficerList);
router.get('/add', policeOfficerController.showAddPoliceOfficerForm);
router.get('/edit/:policeOfficerId', policeOfficerController.showEditPoliceOfficerForm);
router.get('/details/:policeOfficerId', policeOfficerController.showPoliceOfficerDetails);


module.exports = router;