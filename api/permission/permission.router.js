const router = require("express").Router();
const permissionController = require('./permission.controller');
const authenticate = require("./authenticate.middleware");

router.post('/', permissionController.createPermission);
router.get('/:id', permissionController.getPermissionById);
router.put('/:id', permissionController.updatePermission);
router.delete('/:id', permissionController.deletePermission);

module.exports = router;
