import express from 'express';
import { sendMessage } from '../controllers/messageController.js';
import isAuthenticated from '../middleware/isAuthenticated.js';

const router = express.Router();

// Route to send a message
router.route('/send/:id').post(isAuthenticated,sendMessage);

export default router;