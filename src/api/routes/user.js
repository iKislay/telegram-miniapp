import { Router } from "express";
import { register, sendmsg } from "../controllers/user/index.js";
import {
	activateUser,
	deactivateUser,
	checkActivationStatus,
	bulkActivateUsers,
	getAllActiveUsers,
	getAllDeactivatedUsers,
} from "../controllers/user/activation.js";
import {
	banUser,
	unbanUser,
	getBanStatus,
	bulkBanUsers,
	getAllBannedUsers,
} from "../controllers/user/ban.js";

const router = Router();

// AUTH
router.post("/register", register);
router.post("/sendmsg", sendmsg);
// router.post('/verify-email', verifyEmail);
// router.post('/send-verification-code', sendVerificationCode);

// EDIT
// router.put('/', auth, imageUpload, editUser);

// router.get('/', auth, getUser);
// router.delete('/', auth, deleteUser);

router.post("/:userId/activate", activateUser);
router.post("/:userId/deactivate", deactivateUser);
router.get("/:userId/activation-status", checkActivationStatus);

router.post("/:userId/ban", banUser);
router.post("/:userId/unban", unbanUser);
router.get("/:userId/ban-status", getBanStatus);

router.post("/bulk/activate", bulkActivateUsers);
router.post("/bulk/ban", bulkBanUsers);

router.get("/active", getAllActiveUsers);
router.get("/banned", getAllBannedUsers);
router.get("/deactivated", getAllDeactivatedUsers);

export default router;
