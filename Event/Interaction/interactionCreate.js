const { Client , CommandInteraction, MessageEmbed} = require('discord.js');

module.exports ={
    name: 'interactionCreate',
    /**
     * @param {CommandInteraction} interaction
     * @param {Client} client
     */
    async run(message,interaction, client){
        if(interaction.isCommand())
        {
            const command = client.commands.get(interaction.commandName);
            if(!command) return interaction.reply({embeds: [
                new MessageEmbed()
                .setColor("RED")
                .setDescription(`⛔ Command not found or Erorr while running`)
            ]}) && client.commands.delete(interaction.commandName);

            command.run(interaction, client);
        }
    }
}
//commands