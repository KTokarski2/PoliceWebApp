const PoliceOfficerRepository = require('../repository/sequelize/PoliceOfficerRepository');
const authUtil = require('../util/authUtils');

exports.login = (req, res, next) => {
    const lastName = req.body.lastName;
    const password = req.body.password;
    PoliceOfficerRepository.findByNameAndLastName(lastName)
        .then(policeOfficer => {
            if (!policeOfficer) {
                res.render('index', {
                    navLocation: '',
                    loginError: "Wprowadzono błędne dane"
                })
            } else if (authUtil.comparePasswords(password, policeOfficer.password) === true) {
                req.session.loggedUser = policeOfficer;
                res.redirect('/');
            } else {
                res.render('index', {
                    navLocation: '',
                    loginError: "Wprowadzono błędne dane"
                })
            }
        })
        .catch(err => {
            console.log(err);
        });
}

exports.logout = (req, res, next) => {
    req.session.loggedUser = undefined;
    res.redirect('/');
}