const express = require('express');
const router = express.Router();
const caseController = require('../controllers/caseController');

router.get('/', caseController.showCaseList);
router.get('/add', caseController.showAddCaseForm);
router.get('/details/:caseId', caseController.showCaseDetails);

module.exports = router;