const TelegramBot = require('node-telegram-bot-api');
// replace the value below with the Telegram token you receive from @BotFather
const token = '1033136201:AAF0PHep-Ycb0Ql9uM9XOtgmF-pIxKQnoLc';
 
// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {polling: true});
 
// Listen for any kind of message. There are different kinds of messages.
bot.on('message', (msg) => {
  var chatId = msg.chat.id
  InsertData(msg);
  // send a message to the chat acknowledging receipt of their message
  bot.sendMessage(chatId, 'Ready to play');
});

function ToLocalDate (inDate) {
  var d = new Date(inDate*1000);
  var dateString =
    d.getUTCFullYear() + "/" +
    ("0" + (d.getUTCMonth()+1)).slice(-2) + "/" +
    ("0" + d.getUTCDate()).slice(-2) + " " +
    ("0" + (d.getUTCHours()+1)).slice(-2) + ":" +
    ("0" + d.getUTCMinutes()).slice(-2) + ":" +
    ("0" + d.getUTCSeconds()).slice(-2);

  console.log(dateString);
  return dateString;
}

//Setting up Firebase
const {Firestore} = require('@google-cloud/firestore');
const admin = require("firebase-admin");
const serviceAccount = require("./type-to-the-rhythm-firebase-adminsdk-s17m5-8048be7fd7.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://type-to-the-rhythm.firebaseio.com"
});

const db = admin.firestore()

function InsertData(msg) {
  //store in data obj the infos of the message to save in db
  let data = {
    datetime: ToLocalDate(msg.date),
    from: msg.from.username,
    text: msg.text,
    read: "N"
  };

  //create document in db
  let setDoc = db.collection('messages').doc().set(data)
  .then(() => {
    console.log('Document created');
  }).catch((err) => {
    console.log(`Failed to create document: ${err}`);
  });
}
