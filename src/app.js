import express from 'express';
import { port, botToken } from './config/index.js';
import loader from './loaders/index.js';
import { Telegraf, Scenes, session, } from 'telegraf'
const app = express();
// const bot = new Telegraf(botToken);

loader(app);
// loader(app, bot);

app.listen(port, err => {
  if (err) {
    console.log(err);
    return process.exit(1);
  }
  console.log(`Server is running on ${port}`);
});

export default app