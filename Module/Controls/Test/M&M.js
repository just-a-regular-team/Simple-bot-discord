
module.exports ={
  name:"M&M",
  description: 'M&M ;)',
  permission: "SEND_MESSAGES",
  once:true,
}

module.exports.run = function(msg, args) {
  msg.channel.send("LOL M&M ;)");
};