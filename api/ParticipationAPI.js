const ParticipationRepository = require('../repository/sequelize/ParticipationRepository');

exports.getParticipations = (req, res, next) => {
    ParticipationRepository.getParticipations()
        .then(Participations => {
            res.status(200).json(Participations)
        })
        .catch(err => {
            console.log(err)
        });
};

exports.getParticipationsById = (req, res, next) => {
    const ParticipationId = req.params.ParticipationId;
    ParticipationRepository.getParticipationById(ParticipationId)
        .then(Participation => {
            if (!Participation) {
                res.status(404).json({
                    message: 'Participation with id: '+ParticipationId+ 'not found'
                })
            } else {
                res.status(200).json(Participation);
            }
        });
};

exports.createParticipation = (req, res, next) => {
    ParticipationRepository.createParticipation(req.body)
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

exports.updateParticipation = (req, res, next) => {
    const ParticipationId = req.params.ParticipationId;
    ParticipationRepository.updateParticipation(ParticipationId, req.body)
        .then(result => {
            res.status(200).json({message: 'Participation updated', Participation: result});
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

exports.deleteParticipation = (req, res, next) => {
    const ParticipationId = req.params.ParticipationId;
    ParticipationRepository.deleteParticipation(ParticipationId)
        .then(result => {
            res.status(200).json({message: 'Removed participation', Participation: result});
        })
        .catch(err => {
            if(!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        })
};
