const { Event } = require('klasa');

module.exports = class extends Event {
    constructor(...args) {
        super(...args, { event: 'nmsReady', once: true });
    }

    run() {
        for (const guild of this.client.guilds.values()) {
            guild.nms.bucket = guild.settings.get('no-mention-spam.mentionsAllowed');
            guild.nms.cooldown = guild.settings.get('no-mention-spam.timePeriod') * 1000;
        }
    }
};