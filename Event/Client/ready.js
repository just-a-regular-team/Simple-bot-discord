module.exports ={
    name: 'ready',
    once: true,
    execute(client){
      console.log(` ${client.user.tag} is working!`);
      client.user.setActivity(" GAY ", {type: "PLAYING"});
      
      /**
       * if(!Database) return;
        moongoose.connect(Database,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }).then(()=>{
            console.log("Connected to Database");
        }).catch((err) =>{
            console.log(err);
            console.log("AREA error at database");
        });
       */
    }
}