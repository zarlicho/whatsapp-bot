const qrcode = require('qrcode');
const fs = require("fs")
const { Client, LegacySessionAuth, LocalAuth } = require('whatsapp-web.js');
var sleep = require('sleep');
const { url } = require('inspector');
const client = new Client({
     authStrategy: new LocalAuth({
          clientId: "client-one" //Un identificador(Sugiero que no lo modifiques)
     })
})

// Save session values to the file upon successful auth
client.on('authenticated', (session) => {
    console.log(session);
});

client.on('ready', ()=> {
    console.log("ready to send message!")
});
client.initialize();

const login = async(req,res)=>{
    client.on("qr", qr => {
        qrcode.toDataURL(qr, (err, url) => {
            res.json({qr})
          });
    })
}
const api = async(req,res)=>{
    let phone = req.query.phone || req.body.phone;
    const msg = req.query.msg || req.body.msg;
    const chatId = phone.substring(1) + "@c.us"; 
    client.sendMessage(chatId, msg);
    res.json({status: "success sending!", msg});
};
module.exports = {
    ipa: api,
    lo: login,
};
