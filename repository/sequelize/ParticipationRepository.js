const Sequelize = require('sequelize');

const PoliceOfficer = require("../../model/sequelize/PoliceOfficer");
const Participation = require("../../model/sequelize/Participation");
const Case = require("../../model/sequelize/Case");

exports.getParticipations = () => {
    return Participation.findAll({include: [
            {
                model: PoliceOfficer,
                as: 'PoliceOfficer'
            },
            {
                model: Case,
                as: 'Case'
            }]
    });
};

exports.getParticipationById = (participationId) => {
    return Participation.findByPk(participationId, {include: [
            {
                model: PoliceOfficer,
                as: 'PoliceOfficer'
            },
            {
                model: Case,
                as: 'Case'
            }]
    });
};

exports.createParticipation = (data) => {
    return Participation.create({
        PoliceOfficer_id: data.PoliceOfficer_id,
        Case_id: data.Case_id,
        startingDate: data.startingDate == "" ? null : data.startingDate,
        endingDate: data.endingDate == "" ? null : data.startingDate,
        actionTaken: data.actionTaken
    });
};

exports.updateParticipation = (participationId, data) => {
    const startingDate = data.startingDate == "" ? null : data.startingDate;
    const endingDate = data.endingDate == "" ? null : data.endingDate;
    const actionTaken = data.actionTaken;
    return Participation.update(data, {where: {_id: participationId}});

};

exports.deleteParticipation = (participationId) => {
    return Participation.destroy({
        where: {_id: participationId}
    });
};

exports.deleteManyParticipations = (participationsIds) => {
    return Participation.find({ _id: { [Sequelize.Op.in]: participationsIds }});
};