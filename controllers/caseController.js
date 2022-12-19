const CaseRepository = require('../repository/sequelize/CaseRepository');

exports.showCaseList = (req, res, next) => {
    CaseRepository.getCases()
        .then(cases => {
            res.render('pages/Case/list'), {
                cases: cases,
                navLocation: 'case'
            };
        });
};

exports.showAddCaseForm = (req, res, next) => {
    res.render('pages/Case/form', {navLocation: 'case'});
}

exports.showCaseDetails = (req, res, next) => {
    res.render('pages/Case/details', {navLocation: 'case'})
}