// Import necessary dependencies
const pool = require('../../config/database');

module.exports = {
  getAllProjects: (callback) => {
    // Query to fetch all projects
    const query = 'SELECT * FROM em_job_projects';

    // Execute the query
    pool.query(query, (error, projects) => {
      if (error) {
        return callback(error);
      }
      // Return projects data
      return callback(null, projects);
    });
  },

  getProjectById: (projectId, callback) => {
    // Query to fetch a project by ID
    const query = 'SELECT * FROM em_job_projects WHERE project_id = ?';

    // Execute the query
    pool.query(query, [projectId], (error, project) => {
      if (error) {
        return callback(error);
      }
      // Return project data
      return callback(null, project[0]);
    });
  },

  createProject: (projectData, callback) => {
    // Query to insert a new project
    const query = 'INSERT INTO em_job_projects (project_name, project_description, project_manager_id, start_date, end_date, status) VALUES (?, ?, ?, ?, ?, ?)';

    // Extract project data
    const { project_name, project_description, project_manager_id, start_date, end_date, status } = projectData;

    // Execute the query
    pool.query(query, [project_name, project_description, project_manager_id, start_date, end_date, status], (error, result) => {
      if (error) {
        return callback(error);
      }
      // Return the ID of the newly inserted project
      return callback(null, result.insertId);
    });
  },

  updateProject: (projectId, projectData, callback) => {
    // Query to update a project
    const query = 'UPDATE em_job_projects SET project_name = ?, project_description = ?, project_manager_id = ?, start_date = ?, end_date = ?, status = ? WHERE project_id = ?';

    // Extract project data
    const { project_name, project_description, project_manager_id, start_date, end_date, status } = projectData;

    // Execute the query
    pool.query(query, [project_name, project_description, project_manager_id, start_date, end_date, status, projectId], (error, result) => {
      if (error) {
        return callback(error);
      }
      // Return the number of affected rows
      return callback(null, result.affectedRows);
    });
  },

  deleteProject: (projectId, callback) => {
    // Query to delete a project from em_job_projects table
    const deleteProjectQuery = 'DELETE FROM em_job_projects WHERE project_id = ?';
    // Query to delete tasks associated with the project
    const deleteTasksQuery = 'DELETE FROM em_job_tasks WHERE project_id = ?';
    // Query to delete comments associated with the project's tasks
    const deleteCommentsQuery = 'DELETE FROM em_job_comments WHERE task_id IN (SELECT task_id FROM em_job_tasks WHERE project_id = ?)';
    // Query to delete attachments associated with the project's tasks
    const deleteAttachmentsQuery = 'DELETE FROM em_job_attachments WHERE task_id IN (SELECT task_id FROM em_job_tasks WHERE project_id = ?)';

    // Execute the delete queries sequentially
    pool.query(deleteAttachmentsQuery, [projectId], (error, result) => {
        if (error) {
            return callback(error);
        }
        pool.query(deleteCommentsQuery, [projectId], (error, result) => {
            if (error) {
                return callback(error);
            }
            pool.query(deleteTasksQuery, [projectId], (error, result) => {
                if (error) {
                    return callback(error);
                }
                pool.query(deleteProjectQuery, [projectId], (error, result) => {
                    if (error) {
                        return callback(error);
                    }
                    return callback(null, result.affectedRows);
                });
            });
        });
    });
}

};
