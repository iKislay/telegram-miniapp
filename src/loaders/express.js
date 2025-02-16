import express from 'express'
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import { botToken, prefix } from '../config/index.js';
import routes from './../api/routes/index.js';
// import { rateLimiter } from '../api/middlewares/index.js';
import bodyParser from 'body-parser';
import Channel from '../models/channel.js';
import User from '../models/user.js';
import { tgLogger } from '../utils/index.js';
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
  app.get('/a/tes', async (_req, res) => {
    await tgLogger(bot, `
      new channel added
      `)
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
                url: "https://t.me/highsector?earn",
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
    const { channelId, channelCategory, OwnerId, pricingAmount } = req.body;
    try {
      const member = await bot.telegram.getChatMember(channelId, 7672818124);

      if (member.status === "administrator") {

        const chatInfo = await bot.telegram.getChat(channelId);
        const followersCount = await bot.telegram.getChatMembersCount(channelId);

        const owner = await User.findOne({ userId: OwnerId })

        const channelData = {
          username: chatInfo.username || null,
          userId: chatInfo.id,
          name: chatInfo.title,
          category: channelCategory,
          description: chatInfo.description || null,
          owner: owner._id,
          stats: { followersCount },
          pricing: { amount: pricingAmount }
        };

        const channel = new Channel(channelData);
        await channel.save();
        await tgLogger(bot, `
          new channel added
          username - ${chatInfo.username} (${chatInfo.id})
          Name - ${chatInfo.title}
          Subs - ${followersCount}
          Owner - tg://user?id=${OwnerId}
          Category - ${channelCategory}
          Pricing - $${pricingAmount}/hour
          `)
        res.json({ isBotAdmin: true, message: "Channel info saved successfully." });

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