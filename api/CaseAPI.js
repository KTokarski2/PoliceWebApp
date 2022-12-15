const CaseRepository = require('../repository/sequelize/CaseRepository');

exports.getCases = (req, res, next) => {
    CaseRepository.getCases()
        .then(Cases => {
            res.status(200).json(Cases);
        })
        .catch(err => {
            console.log(err)
        });
};

exports.getCasesById = (req, res, next) => {
    const CaseId = req.params.caseId;
    CaseRepository.getCaseById(CaseId)
        .then(Case => {
            if (!Case) {
                res.status(404).json({
                    message: 'Case with id: '+CaseId+' not founf'
                })
            }else {
                res.status(200).json(Case)
            }
        })
};

exports.createCase = (req, res, next) => {
    CaseRepository.createCase(req.body)
        .then(newObj => {
            res.status(201).json(newObj);
        })
        .catch(err => {
            if (!err.statusCode) {

            }
        });
};

exports.updateCase = (req, res, next) => {
    const CaseId = req.params.caseId;
    CaseRepository.updateCase(CaseId, req.body)
        .then(result => {
            res.status(200).json({message: 'Police officer updated', Case: result});
        })
        .catch(err => {
            if(!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

exports.deleteCase = (req, res, next) => {
    const CaseId = req.params.caseId;
    CaseRepository.deleteCase(CaseId)
        .then(result => {
            res.status(200).json({message: 'Removed case', Case: result});
        })
        .catch(err => {
           if(!err.statusCode) {
               err.statusCode = 500;
           }
        });
};