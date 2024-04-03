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

// Function to create a role permission
exports.createRolePermission = (role_id, permission_id, callback) => {
  const query = 'INSERT INTO em_role_permission (role_id, permission_id) VALUES (?, ?)';
  pool.query(query, [role_id, permission_id], (error, result) => {
    if (error) {
      return callback(error);
    }
    return callback(null, result);
  });
};

// Function to get all role permissions
exports.getAllRolePermissions = (callback) => {
  const query = 'SELECT * FROM em_role_permission';
  pool.query(query, (error, rolePermissions) => {
    if (error) {
      return callback(error);
    }
    return callback(null, rolePermissions);
  });
};

// Function to update a role permission
exports.updateRolePermission = (role_permission_id, role_id, permission_id, callback) => {
  const query = 'UPDATE em_role_permission SET role_id = ?, permission_id = ? WHERE id = ?';
  pool.query(query, [role_id, permission_id, role_permission_id], (error, result) => {
    if (error) {
      return callback(error);
    }
    return callback(null, result);
  });
};

// Function to delete a role permission
exports.deleteRolePermission = (role_permission_id, callback) => {
  const query = 'DELETE FROM em_role_permission WHERE id = ?';
  pool.query(query, [role_permission_id], (error, result) => {
    if (error) {
      return callback(error);
    }
    return callback(null, result);
  });
};