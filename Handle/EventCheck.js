const {Events} = require("../Validation/EventNames.js");
const {promisify} = require('util');
const {glob} = require('glob');
const PG = promisify(glob);
const Ascii = require('ascii-table');

module.exports = async (client) => {
    const Table = new Ascii('Events');
     (await PG(`${process.cwd()}/Event/*/*.js`)).map(async(file) =>{
         const event = require(file);
         const L = file.split('/');
        if(!Events.includes(event.name) || !event.name)
        {
            await Table.addRow(`${event.name  || "MISSING"}`,"🛑 file is either invalid or missing",`${L[6]+'/'+L[7]}`);
            return;
        }

        if(event.once)
        {
            client.once(event.name, (...args) => event.execute(...args, client));
        }else
        {
            client.on(event.name, (...args) => event.run(...args, client));
        }

        await Table.addRow(event.name,`✅ `,`${L[6]+'/'+L[7]}`);
        
     })

        console.log(Table.toString());
}