const express = require('express');
const router = express.Router();

const caseApiController = require('../../api/CaseAPI');

router.get('/:caseId', caseApiController.getCasesById);
router.get('/', caseApiController.getCases);
router.post('/', caseApiController.createCase);
router.put('/:caseId', caseApiController.updateCase);
router.delete('/:caseId', caseApiController.deleteCase);

module.exports = router;