const { Monitor } = require('klasa');

module.exports = class extends Monitor {
    constructor(client, store, file, directory) {
        super(client, store, file, directory, {
            ignoreOthers: false,
            ignoreBots: false
        });
        this.roleValue = this.client.options.nms.role;
        this.everyoneValue = this.client.options.nms.everyone;
    }

    async run(message) {
        if (!message.guild || !message.guild.settings.get('no-mention-spam.enabled')) return;

        const mentions = message.mentions.users.filter((user) => !user.bot && user !== message.author).size +
        (message.mentions.roles * this.roleValue) +
        (Number(message.mentions.everyone) * this.everyoneValue);

        if (!mentions) return;

        const rateLimit = message.guild.nms.acquire(message.author.id);

        try {
            for (let i = 0; i < mentions; i++) rateLimit.drip();

            if (rateLimit.remaining / rateLimit.bucket < 0.2) this.client.emit('messageSpamWarning', message);
        } catch (error) {
            this.client.emit('messageSpamExceeded', message);
        }
    }
};