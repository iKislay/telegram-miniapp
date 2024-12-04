import { User } from '../../../../models/index.js';

export default async (req, res) => {
    try {
        // Check if user already exists
        if(!req.body.userId) return res.status(500).json({message: "insufficient data", success: false})
        const exists = await User.exists({ userId: req.body.userId });
        if (exists) {
            return res.status(409).json({
                message: "User already exists",
                success: false,
            });
        }

        // Create new user
        const user = new User({
            email: req.body.email,
            name: req.body.name,
            userId: req.body.userId,
            language: req.body.language,
            platform: req.body.platform,
            isPremium: req.body.isPremium,
            timezone: req.body.timezone,
            lastLogin: Date.now(),
        });

        // Save the user and handle potential errors
        await user.save();

        // Send success response
        return res.status(200).json({
            message: "Successfully registered user",
            success: true,
        });
    } catch (error) {
        console.error("Error occurred:", error);
        return res.status(500).json({
            message: "Failed to register user",
            success: false,
        });
    }
};
