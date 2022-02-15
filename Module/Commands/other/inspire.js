const {CommandInteraction , MessageEmbed} = require('discord.js');
const fetch = require('node-fetch');
module.exports = {
    name: 'inspire',
    description: 'inspire form zenquotes.io',
    permission: "ADMINISTRATOR",
    on:true,

}
function getQuote() {
  return fetch("https://zenquotes.io/api/random")
    .then(res => {
      return res.json()
    })
    .then(data => {
      return data[0]["q"] + " -" + data[0]["a"]
    })
}
module.exports.run = async(interaction , args , client)=>{
  getQuote().then(quote => interaction.reply({embeds: [
        new MessageEmbed()
        .setColor("BLUE")
        .setDescription(quote)
    ]}))
}