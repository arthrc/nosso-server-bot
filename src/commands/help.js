const Discord = require('discord.js');

module.exports = {
	name: 'help',
	description: 'Comandos do server!',
	cooldown: 5,
	execute(message) {
        const embed = new Discord.MessageEmbed()
            .setColor('#fa2d48')
            .setTitle('Ajudinha do робот')
            .setAuthor('робот', 'https://cdn.discordapp.com/attachments/766833928371437570/768504890757742602/botico.png')
            .setDescription('Então voce quer ajuda meu consagrado, veja a lista de comandos e se divirta digitando p!clara :)')
            .addFields(
                { name: 'memes', value: 'arthur, azieta, democracia, diego, maidana'},
                { name: 'úteis', value: 'help, repo'},
                { name: 'bem feitos', value: 'clara'}
            )
            .setTimestamp()
            .setFooter('Espero ter ajudado')
        
            message.channel.send(embed)
    },
};