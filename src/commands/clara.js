const Discord = require('discord.js');

module.exports = {
	name: 'clara',
	description: 'Mr spider!',
	cooldown: 0,
	execute(message) {
        const image =  new Discord.MessageAttachment('./src/assets/mrspider.png')

        message.channel.send('<@702018220646727732>', image);
	},
};