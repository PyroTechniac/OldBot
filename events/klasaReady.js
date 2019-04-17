const { Event } = require('klasa');

module.exports = class extends Event {
    constructor(...args) {
        super(...args, { once: true, event: 'klasaReady' });
    }

    async run() {
        this.ensureTask('cleanup', '@daily');
        await this.client.user.setPresence({
            activity: {
                type: 'PLAYING',
                name: 'Starlight, help'
            }
        });
        this.client.emit('nmsReady');
    }

    ensureTask(task, time) {
        const schedules = this.client.settings.get('schedules');
        if (!schedules.some(s => s.taskName === task)) {
            this.client.schedule.create(task, time);
        }
    }
};