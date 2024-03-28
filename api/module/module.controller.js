const moduleService = require('./module.service');

exports.getAllModules = (req, res) => {
  moduleService.getAllModules((err, modules) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ success: 0, message: 'Failed to fetch modules' });
    }
    return res.status(200).json({ success: 1, data: modules });
  });
};

exports.getModuleById = (req, res) => {
  const moduleId = req.params.id;
  moduleService.getModuleById(moduleId, (err, module) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ success: 0, message: 'Failed to fetch module' });
    }
    return res.status(200).json({ success: 1, data: module });
  });
};

exports.createModule = (req, res) => {
  const { module_name, module_code, description } = req.body;
  moduleService.createModule(module_name, module_code, description, (err, moduleId) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ success: 0, message: 'Failed to create module' });
    }
    return res.status(201).json({ success: 1, message: 'Module created successfully', moduleId });
  });
};

exports.updateModule = (req, res) => {
  const moduleId = req.params.id;
  const { module_name, module_code, description } = req.body;
  moduleService.updateModule(moduleId, module_name, module_code, description, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ success: 0, message: 'Failed to update module' });
    }
    return res.status(200).json({ success: 1, message: 'Module updated successfully' });
  });
};

exports.deleteModule = (req, res) => {
  const moduleId = req.params.id;
  moduleService.deleteModule(moduleId, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ success: 0, message: 'Failed to delete module' });
    }
    return res.status(200).json({ success: 1, message: 'Module deleted successfully' });
  });
};
