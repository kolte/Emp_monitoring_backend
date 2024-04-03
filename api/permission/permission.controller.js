const permissionService = require('./permission.service');

exports.createPermission = (req, res) => {
  const { module_id, permission_name, description } = req.body;
  permissionService.createPermission(module_id, permission_name, description, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ success: 0, message: 'Failed to create permission' });
    }
    return res.status(201).json({ success: 1, message: 'Permission created successfully', data: result });
  });
};

exports.getPermissionById = (req, res) => {
  const permissionId = req.params.id;
  permissionService.getPermissionById(permissionId, (err, permission) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ success: 0, message: 'Failed to fetch permission' });
    }
    return res.status(200).json({ success: 1, data: permission });
  });
};

exports.updatePermission = (req, res) => {
  const permissionId = req.params.id;
  const { module_id, permission_name, description } = req.body;
  permissionService.updatePermission(permissionId, module_id, permission_name, description, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ success: 0, message: 'Failed to update permission' });
    }
    return res.status(200).json({ success: 1, message: 'Permission updated successfully', data: result });
  });
};

exports.deletePermission = (req, res) => {
  const permissionId = req.params.id;
  permissionService.deletePermission(permissionId, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ success: 0, message: 'Failed to delete permission' });
    }
    return res.status(200).json({ success: 1, message: 'Permission deleted successfully', data: result });
  });
};

exports.createRolePermission = (req, res) => {
  const { role_id, permission_id } = req.body;
  permissionService.createRolePermission(role_id, permission_id, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ success: 0, message: 'Failed to create role permission' });
    }
    return res.status(201).json({ success: 1, message: 'Role permission created successfully', data: result });
  });
};

exports.getAllRolePermissions = (req, res) => {
  permissionService.getAllRolePermissions((err, rolePermissions) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ success: 0, message: 'Failed to fetch role permissions' });
    }
    return res.status(200).json({ success: 1, data: rolePermissions });
  });
};

exports.updateRolePermission = (req, res) => {
  const { role_id, permission_id } = req.body;
  const role_permission_id = req.params.id;
  permissionService.updateRolePermission(role_permission_id, role_id, permission_id, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ success: 0, message: 'Failed to update role permission' });
    }
    return res.status(200).json({ success: 1, message: 'Role permission updated successfully', data: result });
  });
};

exports.deleteRolePermission = (req, res) => {
  const role_permission_id = req.params.id;
  permissionService.deleteRolePermission(role_permission_id, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ success: 0, message: 'Failed to delete role permission' });
    }
    return res.status(200).json({ success: 1, message: 'Role permission deleted successfully', data: result });
  });
};