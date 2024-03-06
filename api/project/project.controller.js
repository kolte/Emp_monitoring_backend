// Import project service
const projectService = require('./project.service');

module.exports = {
  getAllProjects: (req, res) => {
    projectService.getAllProjects((error, projects) => {
      if (error) {
        return res.status(500).json({ success: 0, message: 'Internal server error' });
      }
      return res.status(200).json({ success: 1, projects });
    });
  },

  getProjectById: (req, res) => {
    const projectId = req.params.id;
    projectService.getProjectById(projectId, (error, project) => {
      if (error) {
        return res.status(500).json({ success: 0, message: 'Internal server error' });
      }
      if (!project) {
        return res.status(404).json({ success: 0, message: 'Project not found' });
      }
      return res.status(200).json({ success: 1, project });
    });
  },

  createProject: (req, res) => {
    const projectData = req.body;
    projectService.createProject(projectData, (error, projectId) => {
      if (error) {
        return res.status(500).json({ success: 0, message: 'Internal server error' });
      }
      return res.status(201).json({ success: 1, message: 'Project created successfully', projectId });
    });
  },

  updateProject: (req, res) => {
    const projectId = req.params.id;
    const projectData = req.body;
    projectService.updateProject(projectId, projectData, (error, numRowsAffected) => {
      if (error) {
        return res.status(500).json({ success: 0, message: 'Internal server error' });
      }
      if (numRowsAffected === 0) {
        return res.status(404).json({ success: 0, message: 'Project not found or no changes made' });
      }
      return res.status(200).json({ success: 1, message: 'Project updated successfully' });
    });
  },

  deleteProject: (req, res) => {
    const projectId = req.params.id;
    projectService.deleteProject(projectId, (error, numRowsAffected) => {
      if (error) {
        return res.status(500).json({ success: 0, message: 'Internal server error' });
      }
      if (numRowsAffected === 0) {
        return res.status(404).json({ success: 0, message: 'Project not found' });
      }
      return res.status(200).json({ success: 1, message: 'Project deleted successfully' });
    });
  }
};
