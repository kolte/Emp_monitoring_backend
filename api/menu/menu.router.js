const router = require("express").Router();
const menuController = require('./menu.controller');
const authenticate = require("./authenticate.middleware");

router.post('/', authenticate, menuController.createMenu);
router.get('/', authenticate, menuController.getAllMenus);
router.put('/:id', authenticate, menuController.updateMenu);
router.delete('/:id', authenticate, menuController.deleteMenu);

module.exports = router;
