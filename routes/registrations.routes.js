const express = require('express');
const registrationsRouter = express.Router();

const {
    getAllReg,
    getRegById,
    setEntranceTime,
    setExitTime,
    cancelReg,
} = require('../controllers/registrations.controller');

registrationsRouter.get('/', getAllReg);

registrationsRouter.get('/:id', getRegById);

registrationsRouter.post('/', setEntranceTime);

registrationsRouter.patch('/:id', setExitTime);

registrationsRouter.delete('/:id', cancelReg);

module.exports = { registrationsRouter };
