const ParticipationRepository = require('../repository/sequelize/ParticipationRepository');
const PoliceOfficerRepository = require('../repository/sequelize/PoliceOfficerRepository');
const CaseRepository = require('../repository/sequelize/CaseRepository');




exports.showParticipationList = (req, res, next) => {
    ParticipationRepository.getParticipations()
        .then(participations => {
            res.render('pages/Participation/list', {
                participations: participations,
                navLocation: 'participation'
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
                pageTitle: 'Nowy udział w sprawie',
                btnLabel: 'Przydziel policjanta do sprawy',
                formAction: '/Participation/add',
                navLocation: 'participation'
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
                pageTitle: 'Szczegóły udziału w sprawie',
                formAction: '',
                navLocation: 'participation'
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
                pageTitle: 'Edycja udziału w sprawie',
                btnLabel: 'Edytuj udział w sprawie',
                formAction: '/Participation/edit',
                navLocation: 'participation'
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
        });
};

exports.updateParticipation = (req, res, next) => {
    const participationId = req.body._id;
    const participationData = { ...req.body };
    ParticipationRepository.updateParticipation(participationId, participationData)
        .then( result => {
            res.redirect('/Participation');
        });
};

exports.deleteParticipation = (req, res, next) => {
    const participationId = req.params.participationId;
    ParticipationRepository.deleteParticipation(participationId)
        .then( () => {
            res.redirect('/Participation');
        });
};