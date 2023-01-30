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
        pageTitle: req.__('policeOfficer.form.add.pageTitle'),
        formMode: 'createNew',
        btnLabel: req.__('policeOfficer.form.add.btnLabel'),
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
                pageTitle: req.__('policeOfficer.form.details.pageTitle'),
                formAction: '',
                navLocation: 'policeOfficer',
                validationErrors: []
            });
        });

};

exports.showEditPoliceOfficerForm = (req, res, next) => {
    //res.render('pages/PoliceOfficer/form', {navLocation: 'policeOfficer'});
    const loggedUser = req.session.loggedUser;
    const policeOfficerId = parseInt(req.params.policeOfficerId);

    if (policeOfficerId == loggedUser._id) {

    }

    PoliceOfficerRepository.getPoliceOfficerById(policeOfficerId)
        .then(policeOfficer => {
            res.render('pages/PoliceOfficer/form', {
                policeOfficer: policeOfficer,
                formMode: 'edit',
                pageTitle: req.__('policeOfficer.form.edit.pageTitle'),
                btnLabel: req.__('policeOfficer.form.edit.btnLabel'),
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
                pageTitle: req.__('policeOfficer.form.add.pageTitle'),
                btnLabel: req.__('policeOfficer.form.add.btnLabel'),
                formAction: '/PoliceOfficer/add',
                navLocation: 'policeOfficer',
                validationErrors: err.errors
            });
        });
};

exports.updatePoliceOfficer = (req, res, next) => {
    const policeOfficerId = parseInt(req.body._id);
    const policeOfficerData = { ...req.body };
    const loggedUser = req.session.loggedUser;
    if (loggedUser._id == policeOfficerId) {
        PoliceOfficerRepository.updatePoliceOfficer(policeOfficerId, policeOfficerData)
            .then( result => {
                res.redirect('/PoliceOfficer');
            })
            .catch(err => {
                res.render('pages/PoliceOfficer/form', {
                    policeOfficer: policeOfficerData,
                    formMode: 'edit',
                    pageTitle: req.__('policeOfficer.form.edit.pageTitle'),
                    btnLabel: req.__('policeOfficer.form.edit.btnLabel'),
                    formAction: '/PoliceOfficer/edit',
                    navLocation: 'policeOfficer',
                    validationErrors: err.errors
                });
            });

    }else res.redirect('/PoliceOfficer');


};

exports.deletePoliceOfficer = (req, res, next) => {
    const policeOfficerId = parseInt(req.params.policeOfficerId);
    PoliceOfficerRepository.deletePoliceOfficer(policeOfficerId)
        .then( () => {
            res.redirect('/PoliceOfficer');
        });
};