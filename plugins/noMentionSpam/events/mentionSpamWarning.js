const { Event } = require('klasa');

module.exports = class extends Event {
    run(message) {
        return message.send(`${message.author}: Be careful mentioning any more, as you are about to be banned for exceeding this guild's mention threshold`);
    }
};