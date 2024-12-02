import { groupId } from "../config/index.js";

export default async (bot) => {
    bot.catch((err, ctx) => {
        console.error(`Error for user ${ctx.from.id}:`, err);
        const adminChatId = groupId; // Replace with the actual admin channel ID

        // Send error details to the admin channel
        bot.telegram.sendMessage(adminChatId, `Error for user ${ctx.from.id}:\n${err.message}`);

        // Send a user-friendly error message to the user

        ctx.reply('Oops! Something went wrong. Please try again later or use /start to restart.');
    });


    bot.launch();
};