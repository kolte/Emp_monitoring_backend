const pool = require('../../config/database');

const logApiActivity = (employee_id, endpoint, method, requestPayload, responsePayload, statusCode) => {
    const query = `
        INSERT INTO api_activity_log (employee_id, endpoint, method, request_payload, response_payload, status_code, timestamp)
        VALUES (?, ?, ?, ?, ?, ?, NOW())
    `;

    return new Promise((resolve, reject) => {
        pool.query(query, [employee_id, endpoint, method, requestPayload, responsePayload, statusCode], (error, results) => {
            if (error) {
                console.error('Error logging API activity:', error);
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
};

module.exports = {
    logApiActivity
};