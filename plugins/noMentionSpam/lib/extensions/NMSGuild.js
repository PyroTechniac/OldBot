const { Structures } = require('discord.js');
const { RateLimitManager } = require('klasa');

module.exports = Structures.extend('Guild', Guild => {
    class NMSGuild extends Guild {
        constructor(...args) {
            super(...args);

            this.nms = new RateLimitManager(
                this.settings.get('no-mention-spam.mentionsAllowed'),
                this.settings.get('no-mention-spam.timePeriod') * 1000
            );

            if (this.client.ready) {
                this.settings.sync()
                    .then(() => {
                        this.nms.bucket = this.settings.get('no-mention-spam.mentionsAllowed');
                        this.nms.cooldown = this.settings.get('no-mention-spam.timePeriod') * 1000;
                    })
                    .catch(() => null);
            }
        }
    }

    return NMSGuild;
});