const CaseRepository = require('../repository/sequelize/CaseRepository');

exports.showCaseList = (req, res, next) => {
    CaseRepository.getCases()
        .then(cases => {
            res.render('pages/Case/list', {
                cases: cases,
                navLocation: 'case',
                validationErrors: []
            });
        });
};

exports.showAddCaseForm = (req, res, next) => {
    //res.render('pages/Case/form', {navLocation: 'case'});
    res.render('pages/Case/form', {
        Case: {},
        pageTitle: req.__('case.form.add.pageTitle'),
        formMode: 'createNew',
        btnLabel: req.__('case.form.add.btnLabel'),
        formAction: '/Case/add',
        navLocation: 'case',
        validationErrors: []
    });
};

exports.showCaseDetails = (req, res, next) => {
    const caseId = req.params.caseId;
    CaseRepository.getCaseById(caseId)
        .then(Case => {
            res.render('pages/Case/form', {
                Case: Case,
                formMode: 'showDetails',
                pageTitle: req.__('case.form.details.pageTitle'),
                formAction: '',
                navLocation: 'case',
                validationErrors: []
            });
        });
};

exports.showEditCaseForm = (req, res, next) => {
    const caseId = req.params.caseId;
    CaseRepository.getCaseById(caseId)
        .then(Case => {
            res.render('pages/Case/form', {
                Case: Case,
                formMode: 'edit',
                pageTitle: req.__('case.form.edit.pageTitle'),
                btnLabel: req.__('case.form.edit.btnLabel'),
                formAction: '/Case/edit',
                navLocation: 'case',
                validationErrors: []
            });
        });
};

exports.addCase = (req, res, next) => {
    const caseData = { ...req.body };
    CaseRepository.createCase(caseData)
        .then(result => {
            res.redirect('/Case');
        })
        .catch(err => {
            res.render('pages/Case/form', {
                Case: caseData,
                formMode: 'createNew',
                pageTitle: 'Nowa sprawa',
                btnLabel: 'Dodaj sprawę',
                formAction: '/Case/add',
                navLocation: 'case',
                validationErrors: err.errors
            });
        });
};

exports.updateCase = (req, res, next) => {
    const caseId = req.body._id;
    const caseData = { ...req.body };
    CaseRepository.updateCase(caseId, caseData)
        .then( result => {
            res.redirect('/Case');
        })
        .catch(err => {
            res.render('pages/Case/form', {
                Case: caseData,
                formMode: 'edit',
                pageTitle: 'Edycja sprawy',
                btnLabel: 'Edytuj sprawę',
                formAction: '/Case/edit',
                navLocation: 'case',
                validationErrors: err.errors
            });
        });


};

exports.deleteCase = (req, res, next) => {
    const caseId = req.params.caseId;
    CaseRepository.deleteCase(caseId)
        .then( () => {
            res.redirect('/Case');
        });
};

