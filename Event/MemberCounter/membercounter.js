const { Client , CommandInteraction, MessageEmbed} = require('discord.js');
//const {client} = require('../../../index.js');
module.exports = {
    name: 'ready',
    once: true,
    execute(client){
        const guild = client.guilds.cache.get('938170955337986048');
        setInterval(() =>{
            const channel = guild.channels.cache.get('941870464115023912');
            const MemberCount = guild.memberCount;
            channel.setName(`Member Count: ${MemberCount.toLocaleString()}`);
            console.log("Member updated");
            //{giay} * {phut} * {gio} * {ngay}
        },(  1000 * 60 * 60  )) // Member will update every hour
    }
}