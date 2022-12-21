const express = require('express');
const router = express.Router();
const caseController = require('../controllers/caseController');

router.get('/', caseController.showCaseList);
router.get('/add', caseController.showAddCaseForm);
router.post('/add', caseController.addCase);
router.post('/edit', caseController.updateCase);
router.get('/edit/:caseId', caseController.showEditCaseForm);
router.get('/details/:caseId', caseController.showCaseDetails);
router.get('/delete/:caseId', caseController.deleteCase);

module.exports = router;