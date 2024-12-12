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

// Activate User
export const activateUser = async (req, res) => {
	const { userId } = req.params;

	if (!isValidObjectId(userId)) {
		return sendErrorResponse(res, null, "Invalid user ID format", 400);
	}

	try {
		const user = await User.findByIdAndUpdate(
			userId,
			{ isActivated: true },
			{ new: true }
		);
		if (!user) {
			return sendErrorResponse(res, null, "User not found", 404);
		}
		sendSuccessResponse(res, user, "User activated successfully");
	} catch (error) {
		sendErrorResponse(res, error, "Failed to activate user");
	}
};

// Bulk Activate Users
export const bulkActivateUsers = async (req, res) => {
	const { userIds } = req.body;

	if (!Array.isArray(userIds) || userIds.some((id) => !isValidObjectId(id))) {
		return sendErrorResponse(res, null, "Invalid user IDs format", 400);
	}

	try {
		const result = await User.updateMany(
			{ _id: { $in: userIds } },
			{ isActivated: true }
		);
		if (result.modifiedCount === 0) {
			return sendErrorResponse(res, null, "No users were updated", 404);
		}
		sendSuccessResponse(res, result, "Users activated successfully");
	} catch (error) {
		sendErrorResponse(res, error, "Failed to bulk activate users");
	}
};

// Deactivate User
export const deactivateUser = async (req, res) => {
	const { userId } = req.params;
	const { reason } = req.body;

	if (!isValidObjectId(userId)) {
		return sendErrorResponse(res, null, "Invalid user ID format", 400);
	}

	if (!reason || typeof reason !== "string") {
		return sendErrorResponse(
			res,
			null,
			"Deactivation reason is required and must be a string",
			400
		);
	}

	try {
		const user = await User.findByIdAndUpdate(
			userId,
			{ isActivated: false },
			{ new: true }
		);
		if (!user) {
			return sendErrorResponse(res, null, "User not found", 404);
		}
		sendSuccessResponse(res, { user, reason }, "User deactivated successfully");
	} catch (error) {
		sendErrorResponse(res, error, "Failed to deactivate user");
	}
};

// Check Activation Status
export const checkActivationStatus = async (req, res) => {
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
			{ isActivated: user.isActivated },
			"Activation status retrieved successfully"
		);
	} catch (error) {
		sendErrorResponse(res, error, "Failed to retrieve activation status");
	}
};

// Fetch All Active Users
export const getAllActiveUsers = async (req, res) => {
	try {
		const users = await User.find({ isActivated: true });
		if (users.length === 0) {
			return sendErrorResponse(res, null, "No active users found", 404);
		}
		sendSuccessResponse(res, users, "Active users retrieved successfully");
	} catch (error) {
		sendErrorResponse(res, error, "Failed to fetch active users");
	}
};

// Fetch All Deactivated Users
export const getAllDeactivatedUsers = async (req, res) => {
	try {
		const users = await User.find({ isActivated: false });
		if (users.length === 0) {
			return sendErrorResponse(res, null, "No deactivated users found", 404);
		}
		sendSuccessResponse(res, users, "Deactivated users retrieved successfully");
	} catch (error) {
		sendErrorResponse(res, error, "Failed to fetch deactivated users");
	}
};
