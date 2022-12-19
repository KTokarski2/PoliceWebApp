const express = require('express');
const router = express.Router();
const policeOfficerController = require('../controllers/policeOfficerController');

router.get('/', policeOfficerController.showPoliceOfficerList);
router.get('/add', policeOfficerController.showAddPoliceOfficerForm);
router.post('/add', policeOfficerController.addPoliceOfficer);
router.post('/edit', policeOfficerController.updatePoliceOfficer);
router.get('/edit/:policeOfficerId', policeOfficerController.showEditPoliceOfficerForm);
router.get('/details/:policeOfficerId', policeOfficerController.showPoliceOfficerDetails);
router.get('/delete/:policeOfficerId', policeOfficerController.deletePoliceOfficer);


module.exports = router;