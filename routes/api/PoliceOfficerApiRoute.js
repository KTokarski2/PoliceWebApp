const express = require('express');
const router = express.Router();

const policeOfficerApiController = require('../../api/PoliceOfficerAPI');

router.get('/:PoliceOfficerId', policeOfficerApiController.getPoliceOfficersById);
router.get('/', policeOfficerApiController.getPoliceOfficers);
router.post('/', policeOfficerApiController.createPoliceOfficer);
router.put('/:PoliceOfficerId', policeOfficerApiController.updatePoliceOfficer);
router.delete('/:PoliceOfficerId', policeOfficerApiController.deletePoliceOfficer);

module.exports = router;