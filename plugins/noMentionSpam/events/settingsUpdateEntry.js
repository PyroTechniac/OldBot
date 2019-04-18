const { Event } = require('klasa');

module.exports = class extends Event {
    async run(settings, updated) {
        if (updated.every(({ data: [key] }) => !key.startsWith('no-mention-spam'))) return;

        const guild = this.client.guilds.get(settings.id);
        guild.nms.bucket = guild.settings.get('no-mention-spam.mentionsAllowed');
        guild.nms.cooldown = guild.settings.get('no-mention-spam.timePeriod') * 1000;
    }
};