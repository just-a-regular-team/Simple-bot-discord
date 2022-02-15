{
  const controlCommand = require('../../Handle/Commands');
  module.exports ={
      name: 'message',
      once: true,
      execute(client){controlCommand}
  }
}
