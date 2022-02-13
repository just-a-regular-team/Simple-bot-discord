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
   
}
