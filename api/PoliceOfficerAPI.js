const PoliceOfficerRepository  = require('../repository/sequelize/PoliceOfficerRepository');

exports.getPoliceOfficers = (req, res, next) => {
    PoliceOfficerRepository.getPoliceOfficers()
        .then(PoliceOfficers => {
            res.status(200).json(PoliceOfficers);
        })
        .catch(err => {
            console.log(err)
        });
};

exports.getPoliceOfficersById = (req, res, next) => {
    const PoliceOfficerId = req.params.PoliceOfficerId;
    PoliceOfficerRepository.getPoliceOfficerById(PoliceOfficerId)
        .then(PoliceOfficer => {
            if (!PoliceOfficer) {
                res.status(404).json({
                    message: 'Police officer with id: '+PoliceOfficerId+' not found'
                })
            } else {
                res.status(200).json(PoliceOfficer);
            }
        });
};

exports.createPoliceOfficer = (req, res, next) => {
    PoliceOfficerRepository.createPoliceOfficer(req.body)
        .then(newObj => {
            res.status(201).json(newObj);
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

exports.updatePoliceOfficer = (req, res, next) => {
    const PoliceOfficerId = req.params.PoliceOfficerId;
    PoliceOfficerRepository.updatePoliceOfficer(PoliceOfficerId, req.body)
        .then(result => {
            res.status(200).json({message: 'Police officer updated', PoliceOfficer: result});
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

exports.deletePoliceOfficer = (req, res, next) => {
    const PoliceOfficerId = req.params.PoliceOfficerId;
    PoliceOfficerRepository.deletePoliceOfficer(PoliceOfficerId)
        .then(result => {
            res.status(200).json({message: 'Removed police officer', PoliceOfficer: result});
        })
        .catch(err => {
            if(!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};