const qrcode = require('qrcode-terminal');
const fs = require("fs")
const { Client, LegacySessionAuth, LocalAuth } = require('whatsapp-web.js');

const client = new Client({
     authStrategy: new LocalAuth({
          clientId: "client-one"
     })
})

client.on('authenticated', (session) => {
    console.log(session);
});
 

client.initialize();
client.on("qr", qr => {
    qrcode.generate(qr, {small: true} );
})


function Sendmessage(number, msg){
    client.on('ready', () => {
        console.log('ready to send message');
        const chatId = number.substring(1) + "@c.us";
        client.sendMessage(chatId, msg);
        console.log('send message to: ', number);
    });
}

var lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('data.txt')
});

lineReader.on('line', function (line) {
    console.log('Line from file:', line);
    Sendmessage(line, "hey, this message was sent by a bot");
});
