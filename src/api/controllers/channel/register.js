import { Channel } from '../../../../models/index.js';

export default async (req, res) => {
    try {
        // Check if channel already exists
        if(!req.body.userId || !req.body.username) return res.status(500).json({message: "insufficient data", success: false})
        const exists = await Channel.exists({ username: req.body.username });
        if (exists) {
            return res.status(409).json({
                message: "Channel already exists",
                success: false,
            });
        }

        // Create new Channel
        const channel = new Channel({
            name: req.body.name,
            username: req.body.username,
            userId: req.body.userId,
            photoUrl: req.body.photoUrl,
        });

        // Save the channel and handle potential errors
        await channel.save();

        // Send success response
        return res.status(200).json({
            message: "Successfully registered channel",
            success: true,
        });
    } catch (error) {
        console.error("Error occurred:", error);
        return res.status(500).json({
            message: "Failed to register channel",
            success: false,
        });
    }
};
