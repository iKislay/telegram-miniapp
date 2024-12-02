import mongooseLoader from './mongoose.js';
import expressLoader from './express.js';
import telegram from './telegram.js';

export default async (app, bot) => {
  await mongooseLoader();
  expressLoader(app);
  telegram(bot)
}