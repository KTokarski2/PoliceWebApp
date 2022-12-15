exports.showParticipationList = (req, res, next) => {
    res.render('pages/Participation/list', {navLocation: 'participation'});
}

exports.showAddParticipationForm = (req, res, next) => {
    res.render('pages/Participation/form', {navLocation: 'participation'});
}

exports.showParticipationDetails = (req, res, next) => {
    res.render('pages/Participation/details', {navLocatoin: 'participation'});
}