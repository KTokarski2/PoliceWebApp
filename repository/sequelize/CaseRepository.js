const PoliceOfficer = require("../../model/sequelize/PoliceOfficer");
const Participation = require("../../model/sequelize/Participation");
const Case = require("../../model/sequelize/Case");

exports.getCases = () => {
    return Case.findAll();
};

exports.getCaseById = (Case_id) => {
    return Case.findByPk(Case_id,
        {
            include: [{
                model: Participation,
                as: 'participations',
                include: [{
                    model: PoliceOfficer,
                    as: 'PoliceOfficer'
                }]
            }]
        });
};

exports.createCase = (newCaseData) => {
    return Case.create( {
        name: newCaseData.name,
        description: newCaseData.description,
        startingDate: newCaseData.startingDate == "" ? null : newCaseData.startingDate,
        closingDate: newCaseData.closingDate == "" ? null : newCaseData.closingDate
    });
};

exports.updateCase = (Case_id, CaseData) => {
    const name = CaseData.name;
    const description = CaseData.description;
    const startingDate = CaseData.startingDate == "" ? null : CaseData.startingDate;
    const closingDate = CaseData.closingDate == "" ? null : CaseData.closingDate;
    return Case.update({name, description, startingDate, closingDate}, {where: {_id: Case_id}});
};

exports.deleteCase = (Case_id) => {
    return Case.destroy({
        where: {_id: Case_id}
    });
};