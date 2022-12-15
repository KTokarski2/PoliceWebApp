const express = require('express');
const router = express.Router();

const participationApiController = require('../../api/ParticipationAPI');

router.get('/:ParticipationId', participationApiController.getParticipationsById);
router.get('/', participationApiController.getParticipations);
router.post('/', participationApiController.createParticipation);
router.put('/:ParticipationId', participationApiController.updateParticipation);
router.delete('/:ParticipationId', participationApiController.deleteParticipation);

module.exports = router;