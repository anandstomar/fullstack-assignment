import Project from '../models/Project.js';
import cloudinary from '../utils/cloudinary.js';

// Get all projects
export const getProjects = async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch projects' });
  }
};

// Create a new project
export const createProject = async (req, res) => {
  try {
    const { name, description } = req.body;
    if (!req.file) return res.status(400).json({ error: 'Image is required' });
    // Upload image to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: 'projects',
      width: 450,
      height: 350,
      crop: 'fill',
      access_mode: 'public',
    });
    const project = new Project({
      name,
      description,
      image: result.secure_url,
    });
    await project.save();
    res.status(201).json(project);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a project
export const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;
    await Project.findByIdAndDelete(id);
    res.json({ message: 'Project deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete project' });
  }
};

// Update a project (optional, not implemented here) 