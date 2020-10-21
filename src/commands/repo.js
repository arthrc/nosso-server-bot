module.exports = {
	name: 'repo',
	description: 'Repositorio do github!',
	cooldown: 5,
	execute(message) {
		message.channel.send('https://github.com/arthrc/nosso-server-bot');
	},
};