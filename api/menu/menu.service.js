const pool = require("../../config/database");

exports.createMenu = (parent_id, menu_name, menu_url, menu_order, role_ids, callback) => {
  const query = 'INSERT INTO em_menus (parent_id, menu_name, menu_url, menu_order, role_ids) VALUES (?, ?, ?, ?, ?)';
  pool.query(query, [parent_id, menu_name, menu_url, menu_order, JSON.stringify(role_ids)], (error, result) => {
    if (error) {
      return callback(error);
    }
    return callback(null, result);
  });
};

exports.getAllMenus = (callback) => {
  const query = 'SELECT * FROM em_menus ORDER BY parent_id, menu_order';
  pool.query(query, (error, menus) => {
    if (error) {
      return callback(error);
    }
    // Initialize an object to store main menus and their corresponding submenus
    const menuMap = {};
    // Iterate through the menu data to organize into main menu and sub menu format
    menus.forEach(menu => {
      if (menu.parent_id === 0) {
        // This is a main menu
        menuMap[menu.id] = {
          menu_name: menu.menu_name,
          menu_url: menu.menu_url,
          submenus: []
        };
      } else {
        // This is a submenu, add it to the corresponding main menu's submenus
        menuMap[menu.parent_id].submenus.push({
          menu_name: menu.menu_name,
          menu_url: menu.menu_url
        });
      }
    });
    // Convert the menuMap object to an array of main menus
    const formattedMenus = Object.values(menuMap);
    return callback(null, formattedMenus);
  });
};


exports.updateMenu = (menu_id, parent_id, menu_name, menu_url, menu_order, role_ids, callback) => {
  const query = 'UPDATE em_menus SET parent_id = ?, menu_name = ?, menu_url = ?, menu_order = ?, role_ids = ? WHERE id = ?';
  pool.query(query, [parent_id, menu_name, menu_url, menu_order, JSON.stringify(role_ids), menu_id], (error, result) => {
    if (error) {
      return callback(error);
    }
    return callback(null, result);
  });
};

exports.deleteMenu = (menu_id, callback) => {
  const query = 'DELETE FROM em_menus WHERE id = ?';
  pool.query(query, [menu_id], (error, result) => {
    if (error) {
      return callback(error);
    }
    return callback(null, result);
  });
};
