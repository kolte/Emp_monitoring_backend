const menuService = require('./menu.service');

exports.createMenu = (req, res) => {
  const { parent_id, menu_name, menu_url, menu_order, role_ids } = req.body;
  menuService.createMenu(parent_id, menu_name, menu_url, menu_order, role_ids, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ success: 0, message: 'Failed to create menu' });
    }
    return res.status(201).json({ success: 1, message: 'Menu created successfully', data: result });
  });
};

exports.getAllMenus = (req, res) => {
  menuService.getAllMenus((err, menus) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ success: 0, message: 'Failed to fetch menus' });
    }
    return res.status(200).json({ success: 1, data: menus });
  });
};

exports.updateMenu = (req, res) => {
  const { id, parent_id, menu_name, menu_url, menu_order, role_ids } = req.body;
  menuService.updateMenu(id, parent_id, menu_name, menu_url, menu_order, role_ids, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ success: 0, message: 'Failed to update menu' });
    }
    return res.status(200).json({ success: 1, message: 'Menu updated successfully', data: result });
  });
};

exports.deleteMenu = (req, res) => {
  const { id } = req.params;
  menuService.deleteMenu(id, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ success: 0, message: 'Failed to delete menu' });
    }
    return res.status(200).json({ success: 1, message: 'Menu deleted successfully', data: result });
  });
};
