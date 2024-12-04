import { Router } from 'express';
import { register, sendmsg } from '../controllers/user/index.js';

const router = Router();

// AUTH
router.post('/register', register);
router.post('/sendmsg', sendmsg);
// router.post('/verify-email', verifyEmail);
// router.post('/send-verification-code', sendVerificationCode);

// EDIT
// router.put('/', auth, imageUpload, editUser);

// router.get('/', auth, getUser);
// router.delete('/', auth, deleteUser);

export default router