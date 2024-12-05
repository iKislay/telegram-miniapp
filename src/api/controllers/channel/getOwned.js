import { Channel } from '../../../models/index.js';
import User from '../../../models/user.js';

export default async (req, res) => {
    try {
        // Check if channel already exists
        if (!req.body.ownerId) return res.status(500).json({ message: "insufficient data", success: false })
        const owner = await User.findOne({ userId: req.body.ownerId })
        if(!owner) return res.status(500).json({message: "user is not registered, please re launch the app.", success: false})
        const allOwnedChannels = await Channel.find({ owner: owner._id });

        // Send success response
        return res.status(200).json({
            message: allOwnedChannels,
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
