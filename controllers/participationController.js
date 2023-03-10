const ParticipationRepository = require('../repository/sequelize/ParticipationRepository');
const PoliceOfficerRepository = require('../repository/sequelize/PoliceOfficerRepository');
const CaseRepository = require('../repository/sequelize/CaseRepository');




exports.showParticipationList = (req, res, next) => {
    ParticipationRepository.getParticipations()
        .then(participations => {
            res.render('pages/Participation/list', {
                participations: participations,
                navLocation: 'participation',
                validationErrors: []
            });
        });
};

exports.showAddParticipationForm = (req, res, next) => {
    let allPoliceOfficers, allCases;
    PoliceOfficerRepository.getPoliceOfficers()
        .then(policeOfficer => {
            allPoliceOfficers = policeOfficer;
            return CaseRepository.getCases();
        })
        .then(cases => {
            allCases = cases;
            res.render('pages/Participation/form', {
                participation: {},
                formMode: 'createNew',
                allPoliceOfficers: allPoliceOfficers,
                allCases: allCases,
                pageTitle: req.__('participation.form.add.pageTitle'),
                btnLabel: req.__('participation.form.add.btnLabel'),
                formAction: '/Participation/add',
                navLocation: 'participation',
                validationErrors: []
            });
        });
};

exports.showParticipationDetails = (req, res, next) => {
    const participationId = req.params.participationId;
    let allPoliceOfficers, allCases;
    PoliceOfficerRepository.getPoliceOfficers()
        .then(policeOfficer => {
            allPoliceOfficers = policeOfficer;
            return CaseRepository.getCases();
        })
        .then(cases => {
            allCases = cases;
            return ParticipationRepository.getParticipationById(participationId);
        })
        .then(participation => {
            res.render('pages/Participation/form', {
                participation: participation,
                formMode: 'showDetails',
                allPoliceOfficers: allPoliceOfficers,
                allCases: allCases,
                pageTitle: req.__('participation.form.details.pageTitle'),
                formAction: '',
                navLocation: 'participation',
                validationErrors: []
            });
        });
};

exports.showEditParticipationForm = (req, res, next) => {

    const participationId = req.params.participationId;
    let allPoliceOfficers, allCases;
    PoliceOfficerRepository.getPoliceOfficers()
        .then(policeOfficer => {
            allPoliceOfficers = policeOfficer;
            return CaseRepository.getCases();
        })
        .then(cases => {
            allCases = cases;
            return ParticipationRepository.getParticipationById(participationId);
        })
        .then(participation => {
            res.render('pages/Participation/form', {
                participation: participation,
                formMode: 'edit',
                allPoliceOfficers: allPoliceOfficers,
                allCases: allCases,
                pageTitle: req.__('participation.form.edit.pageTitle'),
                btnLabel: req.__('participation.form.edit.btnLabel'),
                formAction: '/Participation/edit',
                navLocation: 'participation',
                validationErrors: []
            });
        });
};

exports.addParticipation = (req, res, next) => {
    const participationData = { ...req.body };
    let allPoliceOfficers, allCases;
    PoliceOfficerRepository.getPoliceOfficers()
        .then(policeOfficer => {
            allPoliceOfficers = policeOfficer;
            return CaseRepository.getCases()
        })
        .then(Case => {
            allCases = Case;
            return ParticipationRepository.createParticipation(participationData)
        })
        .then(result => {
            res.redirect('/Participation');
        })
        .catch(err => {
            res.render('pages/Participation/form', {
                participation: participationData,
                formMode: 'createNew',
                allPoliceOfficers: allPoliceOfficers,
                allCases: allCases,
                pageTitle: req.__('participation.form.add.pageTitle'),
                btnLabel: req.__('participation.form.add.btnLabel'),
                formAction: '/Participation/add',
                navLocation: 'participation',
                validationErrors: err.errors
            });
        });
};

exports.updateParticipation = (req, res, next) => {
    const participationId = req.body._id;
    const participationData = { ...req.body };
    PoliceOfficerRepository.getPoliceOfficers()
        .then(policeOfficer => {
            allPoliceOfficers = policeOfficer;
            return CaseRepository.getCases()
        })
        .then(Case => {
            allCases = Case;
            return ParticipationRepository.updateParticipation(participationId, participationData)
        })
        .then(result => {
            res.redirect('/Participation');
        })
        .catch(err => {
            res.render('pages/Participation/form', {
                participation: participationData,
                formMode: 'edit',
                allPoliceOfficers: allPoliceOfficers,
                allCases: allCases,
                pageTitle: req.__('participation.form.edit.pageTitle'),
                btnLabel: req.__('participation.form.edit.btnLabel'),
                formAction: '/Participation/add',
                navLocation: 'participation',
                validationErrors: err.errors
            });
        });

};

exports.deleteParticipation = (req, res, next) => {
    const participationId = req.params.participationId;
    ParticipationRepository.deleteParticipation(participationId)
        .then( () => {
            res.redirect('/Participation');
        });
};