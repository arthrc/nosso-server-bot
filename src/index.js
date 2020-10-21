const fs = require('fs');
const Discord = require('discord.js');
const Sequelize = require('sequelize');

const { prefix, token } = require('./config.json');

const sequelize = new Sequelize('database', 'user', 'password', {
	host: 'localhost',
	dialect: 'sqlite',
	logging: false,
	storage: 'database.sqlite',
});

const Counter = sequelize.define('counters', {
	name: {
		type: Sequelize.STRING,
		unique: true,
    },
    username: Sequelize.STRING,
	count: {
		type: Sequelize.INTEGER,
		defaultValue: 0,
		allowNull: false,
	},
});

const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./src/commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

const cooldowns = new Discord.Collection();

client.once('ready', () => {
    console.log('Ready!');
    Counter.sync();
});

client.on('message', message => {
    if(message.content === 'fofo' || message.content === 'fofa') async () => {
        const counter = await Counter.findOne({ where: { name: 'fofo' } });
        counter.increment('count');
        return message.channel.send(`Ja falaram fof@ ${counter.count} vezes.`)
    }
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const commandName = args.shift().toLowerCase();

	const command = client.commands.get(commandName)
		|| client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

	if (!command) return;

	if (command.guildOnly && message.channel.type === 'dm') {
		return message.reply('O servidor é logo ali ta');
	}

	if (command.args && !args.length) {
		let reply = `Porra ${message.author}, bota os bgl depois cara!`;

		if (command.usage) {
			reply += `\nO certo seria: \`${prefix}${command.name} ${command.usage}\``;
		}

		return message.channel.send(reply);
	}

	if (!cooldowns.has(command.name)) {
		cooldowns.set(command.name, new Discord.Collection());
	}

	const now = Date.now();
	const timestamps = cooldowns.get(command.name);
	const cooldownAmount = (command.cooldown || 3) * 1000;

	if (timestamps.has(message.author.id)) {
		const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

		if (now < expirationTime) {
			const timeLeft = (expirationTime - now) / 1000;
			return message.reply(`Espera o cooldown de ${timeLeft.toFixed(1)} segundos pra usar o \`${command.name}\` precoce do caralho.`);
		}
	}

	timestamps.set(message.author.id, now);
	setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

	try {
		command.execute(message, args);
	} catch (error) {
		console.error(error);
		message.reply('Ou tu eh um anta ou o comando nn funfa!');
    }
});

client.login(token);