const Discord = require('discord.js');

module.exports = {
	name: 'vaca',
	description: 'Cow bro!',
	cooldown: 0,
	execute(message) {
        const image =  new Discord.MessageAttachment('./src/assets/CowPls.gif')

        message.channel.send('r!p https://www.youtube.com/watch?v=ELBVeRDflV0', image);
	},
};