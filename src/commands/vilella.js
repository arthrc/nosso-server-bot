const Discord = require('discord.js');

module.exports = {
	name: 'vilella',
	description: '4:3',
	cooldown: 0,
	execute(message) {
        const image =  new Discord.MessageAttachment('./src/assets/4por3.png')

        message.channel.send('<@368400142904328193>', image);
	},
};