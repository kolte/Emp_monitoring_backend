const apiLogService = require('./apiLog.service');

const logApiActivityController = (req, res) => {
    const { employee_id, endpoint, method, requestPayload, responsePayload, statusCode } = req.body;
    apiLogService.logApiActivity(employee_id, endpoint, method, requestPayload, responsePayload, statusCode )
        .then(() => {
            res.status(201).json({ message: 'API activity logged successfully' });
        })
        .catch(error => {
            res.status(500).json({ message: 'Error logging API activity', error });
        });
};

module.exports = {
    logApiActivityController
}