const {CommandInteraction , MessageEmbed} = require('discord.js');

module.exports = {
    name: 'ping',
    description: 'Pong!',
    permission: "ADMINISTRATOR",
    on:true,

}

module.exports.run = async (interaction, client) => {
    interaction.reply({embeds: [
        new MessageEmbed()
        .setColor("GREEN")
        .setDescription(`🏓 Pong! ${client.ws.ping}ms `)
    ]});
}