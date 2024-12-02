import { groupId } from '../config/index.js';

export default async (code, userId, message, level, bot) => {
  await bot.telegram.sendMessage(groupId, `
    #${level}
    Code : ${code}
    User : ${userId}
    Message : ${message}
    `)
    .catch(err => {
      console.log('Logging is failed: ' + err);
    });
}