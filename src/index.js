require('./core/bootstrap');

const line = require('@line/bot-sdk');
const store = require('./store');

store.client = new line.Client({
  channelAccessToken: process.env.LINE_CHANNEL_ACCESS_TOKEN,
  channelSecret: process.env.LINE_CHANNEL_SECRET,
});
