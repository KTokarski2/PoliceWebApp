const PoliceOfficerRepository = require('../repository/sequelize/PoliceOfficerRepository');
const {INTEGER} = require("sequelize");

exports.showPoliceOfficerList = (req, res, next) => {
    //res.render('pages/PoliceOfficer/list', {navLocation: 'policeOfficer'});

    PoliceOfficerRepository.getPoliceOfficers()
        .then(policeOfficers => {
            res.render('pages/PoliceOfficer/list', {
                policeOfficers: policeOfficers,
                navLocation: 'policeOfficer'
            });
        });
};

exports.showAddPoliceOfficerForm = (req, res, next) => {
    //res.render('pages/PoliceOfficer/form', {navLocation: 'policeOfficer'});
    res.render('pages/PoliceOfficer/form', {
        policeOfficer: {},
        pageTitle: 'Nowy policjant',
        formMode: 'createNew',
        btnLabel: 'Dodaj policjanta',
        formAction: '/PoliceOfficer/add',
        navLocation: 'policeOfficer',
        validationErrors: []
    });
};

exports.showPoliceOfficerDetails = (req, res, next) => {

    //res.render('pages/PoliceOfficer/details', {navLocation: 'policeOfficer'});
    const policeOfficerId = req.params.policeOfficerId;
    PoliceOfficerRepository.getPoliceOfficerById(policeOfficerId)
        .then(policeOfficer => {
            res.render('pages/PoliceOfficer/form', {
                policeOfficer: policeOfficer,
                formMode: 'showDetails',
                pageTitle: 'Szczegóły policjanta',
                formAction: '',
                navLocation: 'policeOfficer',
                validationErrors: []
            });
        });

};

exports.showEditPoliceOfficerForm = (req, res, next) => {
    //res.render('pages/PoliceOfficer/form', {navLocation: 'policeOfficer'});
    const policeOfficerId = parseInt(req.params.policeOfficerId);
    PoliceOfficerRepository.getPoliceOfficerById(policeOfficerId)
        .then(policeOfficer => {
            res.render('pages/PoliceOfficer/form', {
                policeOfficer: policeOfficer,
                formMode: 'edit',
                pageTitle: 'Edycja policjanta',
                btnLabel: 'Edytuj policjanta',
                formAction: '/PoliceOfficer/edit',
                navLocation: 'policeOfficer',
                validationErrors: []
            });
        });
};

exports.addPoliceOfficer = (req, res, next) => {
    const policeOfficerData = { ...req.body };
    PoliceOfficerRepository.createPoliceOfficer(policeOfficerData)
        .then( result => {
            res.redirect('/PoliceOfficer');
        })
        .catch(err => {
            res.render('pages/PoliceOfficer/form', {
                policeOfficer: policeOfficerData,
                formMode: 'createNew',
                pageTitle: 'Nowy policjant',
                btnLabel: 'Dodaj policjanta',
                formAction: '/PoliceOfficer/add',
                navLocation: 'policeOfficer',
                validationErrors: err.errors
            });
        });
};

exports.updatePoliceOfficer = (req, res, next) => {
    const policeOfficerId = parseInt(req.body._id);
    const policeOfficerData = { ...req.body };
    PoliceOfficerRepository.updatePoliceOfficer(policeOfficerId, policeOfficerData)
        .then( result => {
            res.redirect('/PoliceOfficer');
        })
        .catch(err => {
            res.render('pages/PoliceOfficer/form', {
                policeOfficer: policeOfficerData,
                formMode: 'edit',
                pageTitle: 'Edycja policjanta',
                btnLabel: 'Edytuj policjanta',
                formAction: '/PoliceOfficer/edit',
                navLocation: 'policeOfficer',
                validationErrors: err.errors
            });
        });

};

exports.deletePoliceOfficer = (req, res, next) => {
    const policeOfficerId = parseInt(req.params.policeOfficerId);
    PoliceOfficerRepository.deletePoliceOfficer(policeOfficerId)
        .then( () => {
            res.redirect('/PoliceOfficer');
        });
};