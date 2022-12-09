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
client.on('ready', ()=> {
    console.log("ready to send message!")
});

var lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('data.txt')
});

lineReader.on('line', function (line) {
    client.on('ready', ()=> {  
        console.log('ready to send message');
        const chatId = line.substring(1) + "@c.us"; 
        client.sendMessage(chatId, "bro kalo menurut lu gw deketin gk ya? apa gw jauhin?");
        console.log('send message to: ', line);

    });
});
