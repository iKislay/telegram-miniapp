import { User } from "../../../models/index.js";
import mongoose from "mongoose";

// Utility: Send a standardized success response
const sendSuccessResponse = (res, data, message) => {
	return res.status(200).json({ success: true, message, data });
};

// Utility: Handle and send standardized error response
const sendErrorResponse = (res, error, clientMessage, status = 500) => {
	console.error(error); // Log detailed error for debugging
	const errorMessage = error instanceof Error ? error.message : error;
	res.status(status).json({
		success: false,
		message: clientMessage || "An error occurred",
		error: errorMessage,
	});
};

// Utility: Validate ObjectId format
const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

// Ban User
export const banUser = async (req, res) => {
	const { userId } = req.params;
	const { reason } = req.body;

	if (!isValidObjectId(userId)) {
		return sendErrorResponse(res, null, "Invalid user ID format", 400);
	}

	if (!reason || typeof reason !== "string") {
		return sendErrorResponse(
			res,
			null,
			"Ban reason is required and must be a string",
			400
		);
	}

	try {
		const user = await User.findByIdAndUpdate(
			userId,
			{
				isBanned: true,
				$push: { banReason: reason },
			},
			{ new: true }
		);
		if (!user) {
			return sendErrorResponse(res, null, "User not found", 404);
		}
		sendSuccessResponse(res, user, "User banned successfully");
	} catch (error) {
		sendErrorResponse(res, error, "Failed to ban user");
	}
};

// Bulk Ban Users
export const bulkBanUsers = async (req, res) => {
	const { userIds, reason } = req.body;

	if (!Array.isArray(userIds) || userIds.some((id) => !isValidObjectId(id))) {
		return sendErrorResponse(res, null, "Invalid user IDs format", 400);
	}

	if (!reason || typeof reason !== "string") {
		return sendErrorResponse(
			res,
			null,
			"Ban reason is required and must be a string",
			400
		);
	}

	try {
		const result = await User.updateMany(
			{ _id: { $in: userIds } },
			{
				isBanned: true,
				$push: { banReason: reason },
			}
		);
		if (result.modifiedCount === 0) {
			return sendErrorResponse(res, null, "No users were updated", 404);
		}
		sendSuccessResponse(res, result, "Users banned successfully");
	} catch (error) {
		sendErrorResponse(res, error, "Failed to bulk ban users");
	}
};

// Unban User
export const unbanUser = async (req, res) => {
	const { userId } = req.params;

	if (!isValidObjectId(userId)) {
		return sendErrorResponse(res, null, "Invalid user ID format", 400);
	}

	try {
		const user = await User.findByIdAndUpdate(
			userId,
			{ isBanned: false },
			{ new: true }
		);
		if (!user) {
			return sendErrorResponse(res, null, "User not found", 404);
		}
		sendSuccessResponse(res, user, "User unbanned successfully");
	} catch (error) {
		sendErrorResponse(res, error, "Failed to unban user");
	}
};

// Get Ban Status
export const getBanStatus = async (req, res) => {
	const { userId } = req.params;

	if (!isValidObjectId(userId)) {
		return sendErrorResponse(res, null, "Invalid user ID format", 400);
	}

	try {
		const user = await User.findById(userId);
		if (!user) {
			return sendErrorResponse(res, null, "User not found", 404);
		}
		sendSuccessResponse(
			res,
			{ isBanned: user.isBanned, banReason: user.banReason },
			"Ban status retrieved successfully"
		);
	} catch (error) {
		sendErrorResponse(res, error, "Failed to retrieve ban status");
	}
};

// Fetch All Banned Users
export const getAllBannedUsers = async (req, res) => {
	try {
		const users = await User.find({ isBanned: true });
		if (users.length === 0) {
			return sendErrorResponse(res, null, "No banned users found", 404);
		}
		sendSuccessResponse(res, users, "Banned users retrieved successfully");
	} catch (error) {
		sendErrorResponse(res, error, "Failed to fetch banned users");
	}
};
