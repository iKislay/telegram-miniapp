import mongooseLoader from './mongoose.js';
import expressLoader from './express.js';
import telegram from './telegram.js';

// export default async (app) => {
export default async (app, bot) => {
  await mongooseLoader();
  expressLoader(app, bot);
  telegram(bot)
}