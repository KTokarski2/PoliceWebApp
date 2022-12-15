exports.showCaseList = (req, res, next) => {
    res.render('pages/Case/list', {navLocation: 'case'});
}

exports.showAddCaseForm = (req, res, next) => {
    res.render('pages/Case/form', {navLocation: 'case'});
}

exports.showCaseDetails = (req, res, next) => {
    res.render('pages/Case/details', {navLocation: 'case'})
}