import { config } from 'dotenv';
config();

//NOTE: If you are running the project in an instance, you should store these secret keys in its configuration settings.
// This type of storing secret information is only experimental and for the purpose of local running.

const { DB_URI, PORT, BOT_TOKEN, LOGS_GROUP_ID} = process.env

export const port = PORT || 5000;
export const dbUri = DB_URI;
export const botToken = BOT_TOKEN;
export const groupId = LOGS_GROUP_ID;
export const prefix = '/api';
export const specs = "/docs";