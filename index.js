require('dotenv').config();

const line = require('@line/bot-sdk');
const cron = require('node-cron');

const client = new line.Client({
  channelAccessToken: process.env.LINE_CHANNEL_ACCESS_TOKEN,
  channelSecret: process.env.LINE_CHANNEL_SECRET,
});

let hasSaidHappySunday = false;

cron.schedule('0 6 * * mon-sat', () => sendBroadcast('Bangun gengs.'));
cron.schedule('20 7 * * mon', () => sendBroadcast('Isi rectorate gengs.'));
cron.schedule('50 6 * * mon-sat', () => sendBroadcast('Shift pagi clock in gengs.'));
cron.schedule('50 10 * * mon-sat', () => sendBroadcast('Shift malam clock ing engs.'));
cron.schedule('0 15 * * mon-fri', () => sendBroadcast('Shift pagi clock out gengs.'));
cron.schedule('0 19 * * mon-fri', () => sendBroadcast('Shift malam clock out gengs.'));
cron.schedule('0 13 * * sat', () => sendBroadcast('Shift pagi clock out gengs.'));
cron.schedule('0 17 * * sat', () => sendBroadcast('Shift malam clock out gengs.'));
cron.schedule('0 21 * * sat', () => sendBroadcast('Eval angkatan gengs.'));
cron.schedule('* * * * sun', () => {
  if (!hasSaidHappySunday) {
    state.channel?.send(`Happy Sunday @everyone (yang bikin bot baru bangun).`);
    hasSaidHappySunday = true;
  }
});

async function sendBroadcast(text) {
  try {
    await client.broadcast(broadcastMessage(text));
  } catch (e) {
    console.error(JSON.stringify(e));
  }
}

function broadcastMessage(text) {
  return {
    type: 'text',
    text,
  };
}
