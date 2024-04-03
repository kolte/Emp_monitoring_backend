const router = require("express").Router();
const permissionController = require('./permission.controller');
const authenticate = require("./authenticate.middleware");

router.post('/',authenticate, permissionController.createPermission);
router.get('/:id',authenticate, permissionController.getPermissionById);
router.put('/:id',authenticate, permissionController.updatePermission);
router.delete('/:id',authenticate, permissionController.deletePermission);
router.post('/role-permissions', authenticate, permissionController.createRolePermission);
router.get('/role-permissions', authenticate, permissionController.getAllRolePermissions);
router.put('/role-permissions/:id', authenticate, permissionController.updateRolePermission);
router.delete('/role-permissions/:id', authenticate, permissionController.deleteRolePermission);


module.exports = router;
