const { Client } = require('discord.js');
const {promisify} = require('util');
const {glob} = require('glob');
const PG = promisify(glob);
const Ascii = require('ascii-table');
const {Perms} = require('../Validation/Permissions.js');
 

 module.exports = async (client) => {
     const Table = new Ascii("Commands Loaded");

    CommandsArray = [];
    
    (await PG(`${process.cwd()}/Module/Commands/*/*.js`)).map(async (file) =>{
        const command = require(file);

        if(!command.name) 
        return Table.addRow(file.split('/')[7], "File miss a name", "❗ " );
        
        if(!command.description)
        return Table.addRow(command.name, "File miss a description", "❗ " );

        if(!command.permission)
        {
            if(Perms.includes(command.permission))
            command.defaultPermission = false;
            else
            return Table.addRow(command.name, "File miss a permission", "❗ " );

        }

        client.commands.set(command.name,command );
        CommandsArray.push(command);
        await Table.addRow(command.name, "✅ ", "✅ " );
    });


    console.log(Table.toString());

    // PERMISSION CHECK //



  client.on("ready", async () => {
        const MainGuild = await client.guilds.cache.get("938170955337986048");

        MainGuild.commands.set(CommandsArray).then(async (command) => {
            const Roles = (commandName) => {
                const cmdPerms = CommandsArray.find((c) => c.name === commandName).permission;
                if(!cmdPerms) return;

                return MainGuild.roles.cache.filter((r) => r.permissions.has(cmdPerms));
            }

            const fullPermissions = command.reduce((accumulator , r) => {
                const roles = Roles(r.name);

                if(!roles) return accumulator;

                const permissions = roles.reduce((a,r)=>{
                    return [...a,{id: r.id, type:"ROLE", permission:true}]
                },[])

                return [...accumulator , {id: r.id,permissions}]
            },[])

            await MainGuild.commands.permissions.set({fullPermissions});
        })
    })



   // My Test New Handle Event 
    {//==//Erorr here ,something was wrong 
      const controlCommand = [];
      let _0x46e7bc = new Boolean(true);
      const Table = new Ascii("Command controls");
      
   (await PG(`${process.cwd()}/Module/Controls/*/*.js`)).map(async (file) =>{
     const _0x2723e6 = require(file);
     
      if(!_0x2723e6.name) {
       let _0x46e7bc = false;
      return Table.addRow(file.split('/')[7], "File miss a name", "❗ " );
      }
     
      if(!_0x2723e6.description)
      return Table.addRow(_0x2723e6.name, "File miss a description", "❗ " );

      if(!_0x2723e6.permission)
      {
        if(Perms.includes(_0x2723e6.permission))
        _0x2723e6.defaultPermission = false;
        else
        return Table.addRow(_0x2723e6.name, "File miss a permission", "❗ " );
      }

     controlCommand.push(_0x2723e6);
     await Table.addRow(_0x2723e6.name, "✅ ", "✅ " );
   })
      
     console.log(Table.toString());
      
      if(_0x46e7bc ){
        console.log("/??");
        module.exports.run = async function(msg){
          let tokens = msg.content.split(' ');
          let command = tokens.shift();
          if (command.charAt(0) === '!') {
          command = command.substring(1);
          commands[command](msg, tokens);}
        }
      }else {
        console.log("ControlCommand is ERORR")
        return null;
      }
   }//==
}//END

 