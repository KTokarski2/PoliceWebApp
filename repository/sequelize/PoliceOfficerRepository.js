const PoliceOfficer = require("../../model/sequelize/PoliceOfficer");
const Participation = require("../../model/sequelize/Participation");
const Case = require("../../model/sequelize/Case");

exports.getPoliceOfficers = () => {
    return PoliceOfficer.findAll();
};

exports.getPoliceOfficerById = (PoliceOfficer_id) => {
    return PoliceOfficer.findByPk(PoliceOfficer_id,
        {
            include: [{
                model: Participation,
                as: 'participations',
                include: [{
                    model: Case,
                    as: 'Case'
                }]
            }]
        });
};

exports.createPoliceOfficer = (newPoliceOfficerData) => {
    return PoliceOfficer.create({
        firstName: newPoliceOfficerData.firstName,
        lastName: newPoliceOfficerData.lastName,
        rank: newPoliceOfficerData.rank,
        department: newPoliceOfficerData.department,
        salary: newPoliceOfficerData.salary
    });
};

exports.updatePoliceOfficer = (PoliceOfficer_id, PoliceOfficerData) => {
    const firstName = PoliceOfficerData.firstName;
    const lastName = PoliceOfficerData.lastName;
    const rank = PoliceOfficerData.rank;
    const department = PoliceOfficerData.department;
    const salary = PoliceOfficerData.salary;
    console.log(PoliceOfficer_id);
    console.log(PoliceOfficerData);
    return PoliceOfficer.update(PoliceOfficerData, {where: { _id: PoliceOfficer_id }});
};

exports.deletePoliceOfficer = (PoliceOfficer_id) => {
    return PoliceOfficer.destroy({
       where: { _id: PoliceOfficer_id}
    });
};