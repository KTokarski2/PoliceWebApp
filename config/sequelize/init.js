const sequelize = require('./sequelize');

const PoliceOfficer = require('../../model/sequelize/PoliceOfficer');
const Case = require('../../model/sequelize/Case');
const Participation = require('../../model/sequelize/Participation');
const authUtil = require('../../util/authUtils');
const passHash = authUtil.hashPassword('12345')

module.exports = () => {
    PoliceOfficer.hasMany(Participation, {as: 'participations', foreignKey: {name: 'PoliceOfficer_id', allowNull: false}, constraints: true, onDelete: 'CASCADE'});
    Participation.belongsTo(PoliceOfficer, {as: 'PoliceOfficer', foreignKey: {name: 'PoliceOfficer_id', allowNull: false} });
    Case.hasMany(Participation, {as: 'participations', foreignKey: {name: 'Case_id', allowNull: false}, constraints: true, onDelete: 'CASCADE'});
    Participation.belongsTo(Case, {as: 'Case', foreignKey: {name: 'Case_id', allowNull: false}});

    let allPoliceOfficers, allCases;

    return sequelize
        .sync({force: true})
        .then( () => {
            return PoliceOfficer.findAll();
        })
        .then(PoliceOfficers => {
            if ( !PoliceOfficers || PoliceOfficers.length == 0 ) {
                return PoliceOfficer.bulkCreate([
                    {firstName: 'Adam', lastName: 'Małysz', password: passHash, rank: 'Starszy aspirant', department: 'ruch drogowy', salary: 5000},
                    {firstName: 'Kamil', lastName: 'Stoch', password: passHash, rank: 'Posterunkowy', department: 'prewencja', salary: 3500},
                    {firstName: 'Piotr', lastName: 'Żyła', password: passHash, rank: 'Sierżant', department: 'kryminalny', salary: 4000},
                    {firstName: 'Sławomir', lastName: 'Borewicz', password: passHash, rank: 'Inspektor', department: 'kryminalny', salary: 10000},
                ])
                    .then( () => {
                        return PoliceOfficer.findAll();
                    });
            } else {
                return PoliceOfficers;
            }
        })
        .then( PoliceOfficers => {
            allPoliceOfficers = PoliceOfficers;
            return Case.findAll();
        })
        .then( Cases => {
            if ( !Cases || Cases.length == 0 ) {
                return Case.bulkCreate([
                    {name: 'Kolizja', description: 'WOR3023 i GDA3201, ulica Wiślana', startingDate: '2022-12-01', closingDate: '2022-12-05'},
                    {name: 'Spożywanie alkoholu w miejscu publicznym', description: null, startingDate: '2022-11-25', closingDate: '2022-11-26'},
                    {name: 'Zabójstwo', description: 'Znalezionio zwłoki przy ulicy Marszałkowskiej', startingDate: '2022-12-03', closingDate: null}
                ])
                    .then( () => {
                        return PoliceOfficer.findAll();
                    });
            }else  {
                return Cases;
            }
        })
        .then( Cases => {
            allCases = Cases;
            return Participation.findAll();
        })
        .then( Participations => {
            if ( !Participations || Participations.length == 0 ) {
                return Participation.bulkCreate([
                    {PoliceOfficer_id: allPoliceOfficers[0]._id, Case_id: allCases[0]._id, startingDate: '2022-12-01', endingDate: '2022-12-05', actionTaken: 'Przesłuchano świadków zdarzenia' },
                    {PoliceOfficer_id: allPoliceOfficers[1]._id, Case_id: allCases[1]._id, startingDate: '2022-11-25', endingDate: '2022-11-26', actionTaken: 'Wystawiono mandaty'},
                    {PoliceOfficer_id: allPoliceOfficers[2]._id, Case_id: allCases[2]._id, startingDate: '2022-12-03', endingDate: '2022-12-04', actionTaken: 'Zabezpieczono materiał dowodowy'},
                    {PoliceOfficer_id: allPoliceOfficers[3]._id, Case_id: allCases[2]._id, startingDate: '2022-12-04', endingDate: '2022-12-07', actionTaken: 'Przesłuchano świadków zdarzenia'}
                ]);
            } else {
                return Participations;
            }
        });
};