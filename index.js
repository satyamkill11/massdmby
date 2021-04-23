const Discord = require('discord.js');
const client = new Discord.Client({ ws: { intents: new Discord.Intents(Discord.Intents.ALL) } });
const prefix = "@";
const keepAlive = require('./server')


client.on("ready", () => {
  console.log(`O bot está funcionando corretamente, nenhum erro ocorreu`)
  console.log(`Prefix : ${prefix}`)
  console.log(`https://discord.gg/mmmXUAv8CK`)
  client.user.setActivity({ type: "WATCHING", name: `Mass Osm` });
});


client.on("message", message => {

  if (message.content.startsWith(prefix + 'dm')) {
    if (!message.member.hasPermission("ADMINISTRATOR")) {
      return message.reply('Você não tem permissão para usar este bot')
    }
    else {
      message.delete
      args = message.content.split(" ").slice(1);
      var argresult = args.join(' ');

      message.guild.members.cache.forEach(member => {
        member.send(argresult).then(console.log(`[+] Mensagem com sucesso | ${member.user.username}#${member.user.discriminator}`)).catch(e => console.error(`[-] O membro pode ter DM's desativado ou o Bot Caiu | ${member.user.username}#${member.user.discriminator}`));
      })
      console.log(`[/] Com sucesso.`)
      message.channel.send(`:white_check_mark: | **Todas as mensagens enviadas com sucesso**`).then(message.delete({ timeout: 15000 }));
    }
  }

})

keepAlive();
client.login(process.env.DISCORD_BOT_TOKEN);
