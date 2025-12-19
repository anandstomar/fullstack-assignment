import express from 'express';
import multer from 'multer';
import { getClients, createClient, deleteClient } from '../controllers/clientController.js';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.get('/', getClients);
router.post('/', upload.single('image'), createClient);
router.delete('/:id', deleteClient);

export default router; 