module.exports = {
    name: 'democracia',
    description: 'Democracia.',
    cooldown: 5,
    execute(message) {
        message.channel.send('Isso não é uma democracia, nunca foi e nunca será!');
    },
};