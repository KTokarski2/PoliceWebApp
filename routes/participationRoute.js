const express = require('express');
const router = express.Router();
const participationController = require('../controllers/participationController');

router.get('/', participationController.showParticipationList);
router.get('/add', participationController.showAddParticipationForm);
router.post('/add', participationController.addParticipation);
router.post('/edit', participationController.updateParticipation);
router.get('/edit/:participationId', participationController.showEditParticipationForm);
router.get('/details/:participationId', participationController.showParticipationDetails);
router.get('/delete/:participationId', participationController.deleteParticipation);

module.exports = router;