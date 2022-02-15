const { Client, Collection} = require('discord.js');
const client = new Client({ intents: 32767});
//const {Token} = require("./config.json");
const myToken = process.env['Token']
const keepAlive = require("./server");

module.exports =client;
 

client.commands = new Collection();

require("./Handle/EventCheck.js")(client);
require("./Handle/Commands.js")(client);

keepAlive()
//client.login(Token);
client.login(myToken);