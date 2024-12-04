export default async (req, res) => {
    const { chatId, text } = req.body;

    try {
        await bot.sendMessage(chatId, text, {
            reply_markup: {
                inline_keyboard: [
                    [
                        {
                            text: "Add Bot to Channel",
                            url: "https://t.me/highsectorbot?startchannel",
                        },
                    ],
                ],
            },
        });
        res.status(200).json({ success: true });
    } catch (error) {
        console.error("Error occurred:", error);
        return res.status(500).json({
            message: "Failed to send message to user ",
            success: false,
        });
    }
};