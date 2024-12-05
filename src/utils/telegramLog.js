import { groupId } from "../config/index.js";

export default async (bot, msg) => {
    bot.telegram.sendMessage(groupId, msg);
};