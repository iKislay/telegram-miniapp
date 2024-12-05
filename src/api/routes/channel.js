import { Router } from 'express';
import { getAllChannels, getOwned, register } from '../controllers/channel/index.js';

const router = Router();

// AUTH
router.post('/register', register);
router.get('/getAll', getAllChannels);
router.get('/getOwned', getOwned);
// router.post('/verify-email', verifyEmail);
// router.post('/send-verification-code', sendVerificationCode);

// EDIT
// router.put('/', auth, imageUpload, editUser);

// router.get('/', auth, getUser);
// router.delete('/', auth, deleteUser);

export default router