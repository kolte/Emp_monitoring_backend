const pool = require("../../config/database");

module.exports = {
  getAllModules: (callback) => {
    const query = 'SELECT * FROM em_module';
    pool.query(query, (error, modules) => {
      if (error) {
        return callback(error);
      }
      return callback(null, modules);
    });
  },

  getModuleById: (moduleId, callback) => {
    const query = 'SELECT * FROM em_module WHERE id = ?';
    pool.query(query, [moduleId], (error, module) => {
      if (error) {
        return callback(error);
      }
      return callback(null, module[0]);
    });
  },

  createModule: (moduleName, moduleCode, description, callback) => {
    const query = 'INSERT INTO em_module (module_name, module_code, description) VALUES (?, ?, ?)';
    pool.query(query, [moduleName, moduleCode, description], (error, result) => {
      if (error) {
        return callback(error);
      }
      return callback(null, result.insertId);
    });
  },

  updateModule: (moduleId, moduleName, moduleCode, description, callback) => {
    const query = 'UPDATE em_module SET module_name = ?, module_code = ?, description = ? WHERE id = ?';
    pool.query(query, [moduleName, moduleCode, description, moduleId], (error, result) => {
      if (error) {
        return callback(error);
      }
      return callback(null, result);
    });
  },

  deleteModule: (moduleId, callback) => {
    const query = 'DELETE FROM em_module WHERE id = ?';
    pool.query(query, [moduleId], (error, result) => {
      if (error) {
        return callback(error);
      }
      return callback(null, result);
    });
  }
};
