// Registration model
const { Registration } = require('../models/registration.model');

//* Get all registrations
const getAllReg = async (req, res) => {
    try {
        // Get all registrations from table
        const registrations = await Registration.findAll();

        // Send a response with all registrations.
        // 200 => the request has been successfully processed
        res.status(200).json({
            status: 'success',
            data: { registrations },
        });
    } catch (error) {
        console.log(error);
    }
};

//* Get a single registration
const getRegById = async (req, res) => {
    try {
        // Extract the id from the request params
        const { id } = req.params;

        // Get the first registration in table that match the primary key with the request id
        const registration = await Registration.findByPk(id);

        // If registration has not found, send an error response
        if (!registration) {
            return res.status(404).json({
                status: 'error',
                message: 'registration not found',
            });
        }

        // Send a response with the found registration.
        // 200 => the request has been successfully processed
        res.status(200).json({
            status: 'success',
            data: { registration },
        });
    } catch (error) {
        console.log(error);
    }
};

//* Create a registration with it's entrance time
const setEntranceTime = async (req, res) => {
    try {
        // Extract the entrance time from the request body
        //! the entrance time format is 'YYYY-MM-DD HH:mm:ss'
        const { entranceTime } = req.body;

        // Create registration in table.
        // the registration default status value is 'working'
        const newRegistration = await Registration.create({ entranceTime });

        // Send a response with the new registration.
        // 201 => request successfully processed, a new resource has been created
        res.status(201).json({
            status: 'success',
            data: { newRegistration },
        });
    } catch (error) {
        console.log(error);
    }
};

//* Set the registration exit time
const setExitTime = async (req, res) => {
    try {
        // Extract the id from the request params
        const { id } = req.params;
        // Extract the exit time from the request body
        const { exitTime } = req.body;

        // Get the first registration in table that match the primary key with the request id
        const registration = await Registration.findByPk(id);

        // If registration has not found, send an error response
        if (!registration) {
            return res.status(404).json({
                status: 'error',
                message: 'registration not found',
            });
        }

        // Update the registration exit time and set the status as 'out'
        await registration.update({ exitTime, status: 'out' });

        // Send a response with the updated registration.
        // 200 => the request has been successfully processed
        res.status(200).json({
            status: 'success',
            data: { registration },
        });
    } catch (error) {
        console.log(error);
    }
};

//* Update the registration status as 'canceled'
const cancelReg = async (req, res) => {
    try {
        // Extract id from the request params
        const { id } = req.params;

        // Get the first registration in table that match the primary key with the request id
        const registration = await Registration.findByPk(id);

        // If registration has not found, send an error response
        if (!registration) {
            return res.status(404).json({
                status: 'error',
                message: 'registration not found',
            });
        }

        // Update the registration status as 'cancelled'
        await registration.update({ status: 'cancelled' });

        // Send a response without data.
        // 204 => request successfully processed, the response has no data
        res.status(204).json({
            status: 'success',
        });
    } catch (error) {
        console.log(error);
    }
};

module.exports = {
    getAllReg,
    getRegById,
    setEntranceTime,
    setExitTime,
    cancelReg,
};
