const PoliceOfficerRepository = require('../repository/sequelize/PoliceOfficerRepository');

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
        pageTitle: 'Nowy Policjant',
        formMode: 'createNew',
        btnLabel: 'Dodaj policjanta',
        formAction: '/PoliceOfficer/add',
        navLocation: 'policeOfficer'
    });
};

exports.showPoliceOfficerDetails = (req, res, next) => {
    //res.render('pages/PoliceOfficer/details', {navLocation: 'policeOfficer'});

};

exports.showEditPoliceOfficerForm = (req, res, next) => {
    //res.render('pages/PoliceOfficer/form', {navLocation: 'policeOfficer'});
    const policeOfficerId = req.params.policeOfficerId;
    PoliceOfficerRepository.getPoliceOfficerById(policeOfficerId)
        .then(policeOfficer => {
            res.render('pages/PoliceOfficer/form', {
                policeOfficer: policeOfficer,
                formMode: 'edit',
                pageTitle: 'Edycja policjanta',
                btnLabel: 'Edytuj policjanta',
                formAction: '/PoliceOfficer/edit',
                navLocation: 'policeOfficer'
            });
        });
};