const { Task } = require('klasa');

module.exports = class extends Task {
    constructor(client, store, file, directory) {
        super(client, store, file, directory, {
            name: 'reminder',
            enabled: true
        });
    }

    async run({ user, channel, text }) {
        if (channel) {
            try {
                this.client.util.resolveChannel(channel, this.client.channels).send(`${this.client.util.resolveUser(user, this.client.users)}, you wanted me to remind you:\n\`${text}\``);
            } catch (err) { null; }
        }
        return this.client.util.resolveUser(user, this.client.users).send(`You wanted me to remind you:\n\`${text}\``);
    }
};