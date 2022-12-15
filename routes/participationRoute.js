const express = require('express');
const router = express.Router();
const participationController = require('../controllers/participationController');

router.get('/', participationController.showParticipationList);
router.get('/add', participationController.showAddParticipationForm);
router.get('/details/:participationId', participationController.showParticipationDetails);

module.exports = router;