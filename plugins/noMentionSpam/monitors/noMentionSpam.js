const { Client, Monitor } = require('klasa');

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
    }
};