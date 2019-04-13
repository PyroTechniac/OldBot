const { Event } = require('klasa');

module.exports = class extends Event {
    constructor(...args) {
        super(...args, { once: true });
    }

    async run() {
        await this.client.schedule.create('cleanup', '@daily');
        await this.client.user.setPresence({
            activity: {
                type: 'PLAYING',
                name: 'Starlight, help'
            }
        });
    }
};