const {CommandInteraction , MessageEmbed} = require('discord.js');
const randomPuppy = require("random-puppy");
module.exports = {
    name: 'meme',
    description: 'random meme',
    permission: "ADMINISTRATOR",
    once:true,
}

module.exports.run = async (interaction, client) => {

    const subReddits = ["dankmeme", "meme", "me_irl"];
    const random = subReddits[Math.floor(Math.random() * subReddits.length)];

    const img = await randomPuppy(random);

    interaction.reply({embeds: [
        new MessageEmbed()
        .setColor("RANDOM")
        .setImage(img)
        .setURL(`https://reddit.com/r/${random}`)
    ]});
}