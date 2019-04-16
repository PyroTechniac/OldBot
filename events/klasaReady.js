const { Event } = require('klasa');

module.exports = class extends Event {
    constructor(...args) {
        super(...args, { once: true, event: 'klasaReady' });
    }

    async run() {
        const { tasks } = this.client.schedule;
        if (!tasks.some(t => t.taskName === 'cleanup')) {
            this.client.emit('log', 'Creating task cleanup');
            await this.client.schedule.create('cleanup', '@daily');
        }
        await this.client.user.setPresence({
            activity: {
                type: 'PLAYING',
                name: 'Starlight, help'
            }
        });
    }
};