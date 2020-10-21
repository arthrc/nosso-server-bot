module.exports = {
	name: 'addcounter',
	description: 'adicionar counter',
	cooldown: 5,
	async execute(message, args) {
        const counterName = args[0]

        try {
            const counter = await Counter.create({
                name: counterName,
                username: message.author.username,
            });
            return message.reply(`O counter ${Counter.name} foi criada.`);
        }
        catch (e) {
            if (e.name === 'SequelizeUniqueConstraintError') {
                return message.reply('Esse counter já existe.');
            }
            return message.reply('Algo deu errado criando seu counter.');
        }
	},
};