const pool = require("../../config/database");

exports.createPermission = (module_id, permission_name, description, callback) => {
  const query = 'INSERT INTO em_permission (module_id, permission_name, description) VALUES (?, ?, ?)';
  pool.query(query, [module_id, permission_name, description], (error, result) => {
    if (error) {
      return callback(error);
    }
    return callback(null, result);
  });
};

exports.getPermissionById = (permissionId, callback) => {
  const query = 'SELECT * FROM em_permission WHERE id = ?';
  pool.query(query, [permissionId], (error, permission) => {
    if (error) {
      return callback(error);
    }
    return callback(null, permission);
  });
};

exports.updatePermission = (permissionId, module_id, permission_name, description, callback) => {
  const query = 'UPDATE em_permission SET module_id = ?, permission_name = ?, description = ? WHERE id = ?';
  pool.query(query, [module_id, permission_name, description, permissionId], (error, result) => {
    if (error) {
      return callback(error);
    }
    return callback(null, result);
  });
};

exports.deletePermission = (permissionId, callback) => {
  const query = 'DELETE FROM em_permission WHERE id = ?';
  pool.query(query, [permissionId], (error, result) => {
    if (error) {
      return callback(error);
    }
    return callback(null, result);
  });
};
