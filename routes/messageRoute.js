import express from 'express';
import { getMessages, sendMessage } from '../controllers/messageController.js';
import isAuthenticated from '../middleware/isAuthenticated.js';

const router = express.Router();

// Route to send a message
router.route('/send/:id').post(isAuthenticated,sendMessage);
router.route('/:id').get(isAuthenticated, getMessages);


export default router;