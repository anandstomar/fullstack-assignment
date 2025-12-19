import express from 'express';
import multer from 'multer';
import { getProjects, createProject, deleteProject } from '../controllers/projectController.js';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.get('/', getProjects);
router.post('/', upload.single('image'), createProject);
router.delete('/:id', deleteProject);

export default router; 