import express from 'express'
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import { botToken, prefix } from '../config/index.js';
import routes from './../api/routes/index.js';
// import { rateLimiter } from '../api/middlewares/index.js';
import bodyParser from 'body-parser';
import logger from '../utils/logger.js';
import Channel from '../models/channel.js';

export default (app, bot) => {


  // app.enable('trust proxy');
  app.use(cors());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(morgan('dev'));
  app.use(helmet());
  app.use(express.static('public'));
  //   app.disable('x-powered-by');
  //   app.disable('etag');

  //   app.use(rateLimiter);
  app.use(prefix, routes);

  app.get('/', (_req, res) => {
    return res.status(200).json({
      message: 'Project is successfully working...',
      success: true
    });
  });
  app.post("/api/sendInlineMessage", async (req, res) => {
    const { chatId, text } = req.body;
    console.log(req.body)
    try {
      await bot.telegram.sendMessage(chatId, text, {
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: "Add Bot to Channel",
                url: "https://t.me/yourbot?startchannel",
              },
            ],
          ],
        },
      });
      res.status(200).json({ success: true });
    } catch (error) {
      console.error("Error sending message:", error);
      res.status(200).json({ success: false });
    }
  });

  app.post("/api/checkBotAdmin", async (req, res) => {
    const { channelId, channelCategory, ownerId, pricingAmount } = req.body;
    try {
      const response = await fetch(
        `https://api.telegram.org/bot${botToken}/getChatMember?chat_id=${channelId}&user_id=${botToken}`
      );
      const data = await response.json();
      if (data.ok && data.result.status === "administrator") {

        const chatInfoResponse = await fetch(
          `https://api.telegram.org/bot${botToken}/getChat?chat_id=${channelId}`
        );
        const chatSubCountResponse = await fetch(
          `https://api.telegram.org/bot${botToken}/getChatMemberCount?chat_id=${channelId}`
        );
        const chatInfoData = await chatInfoResponse.json();
        const chatSubCountData = await chatSubCountResponse.json();

        if (chatInfoData.ok && chatSubCountData.ok) {
          const chatInfo = chatInfoData.result;
          const followersCount = chatSubCountData.result
          // Extract relevant information
          const channelData = {
            username: chatInfo.username || null,
            userId: chatInfo.id,
            name: chatInfo.title,
            photoUrl: chatInfo.photo
              ? `https://api.telegram.org/file/bot${botToken}/${chatInfo.photo.small_file_id}`
              : null,
            category: channelCategory,
            description: chatInfo.description || null,
            owner: ownerId, 
            stats: {followersCount},
            pricing: {amount: pricingAmount}
          };

          // Save to database
          const channel = new Channel(channelData);
          await channel.save();

          res.json({ isBotAdmin: true, message: "Channel info saved successfully." });
        } else {
          res.status(500).json({ isBotAdmin: true, message: "Failed to fetch channel info." });
        }
      } else {
        res.json({ isBotAdmin: false });
      }
    } catch (error) {
      console.error("Error checking admin status:", error);
      res.status(500).send("Server Error");
    }
  });

  // app.use((req, res, next) => {
  //   res.header('Access-Control-Allow-Origin', '*');
  //   res.header('Access-Control-Allow-Headers',
  //     'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  //   res.header('Content-Security-Policy-Report-Only', 'default-src: https:');
  //   if (req.method === 'OPTIONS') {
  //     res.header('Access-Control-Allow-Methods', 'PUT POST PATCH DELETE GET');
  //     return res.status(200).json({});
  //   }
  //   next();
  // });

  // app.use((_req, _res, next) => {
  //   const error = new Error('Endpoint could not find!');
  //   error.status = 404;
  //   next(error);
  // });

  // app.use((error, req, res, _next) => {
  //   res.status(error.status || 500);
  //   let resultCode = '00015';
  //   let level = 'External Error';
  //   if (error.status === 500) {
  //     resultCode = '00013';
  //     level = 'Server Error';
  //   } else if (error.status === 404) {
  //     resultCode = '00014';
  //     level = 'Client Error';
  //   }
  //   logger(resultCode, req?.user?._id ?? '', error.message, level, req);
  //   return res.json({
  //     message: error.message,
  //     success: false,
  //   });

  // });
}