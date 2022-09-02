const express = require('express');

//routers
const { registrationsRouter } = require('./routes/registrations.routes');

//initialize express app
const app = express();

//enable to receive json data
app.use(express.json());

//define endpoints
app.use('/api/v1/registrations', registrationsRouter);

//catch non existing endpoints
app.all('*', (req, res) => {
    res.status(404).json({
        status: 'error',
        message: `${req.method} ${req.url} doesn't exist on server`,
    });
});

module.exports = { app };
