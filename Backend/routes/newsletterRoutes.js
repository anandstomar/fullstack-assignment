import express from 'express';
import { subscribeNewsletter, getNewsletters } from '../controllers/newsletterController.js';

const router = express.Router();

router.post('/', subscribeNewsletter);
router.get('/', getNewsletters);

export default router; 