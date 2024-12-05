import { Channel } from '../../../models/index.js';

export default async (req, res) => {
    try {
        // Check if channel already exists
        const channel = await Channel.find({});
        
        // Send success response
        return res.status(200).json({
            message: channel,
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
