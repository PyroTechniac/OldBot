const { Event } = require('klasa');

module.exports = class extends Event {
    constructor(...args) {
        super(...args, { once: true });
    }

    async run() {
        await this.client.user.setPresence({
            activity: {
                type: 'PLAYING',
                name: 'Starlight, help'
            }
        });

        this.ensureTask('cleanup', '@daily');
    }

    ensureTask(task, time) {
        const schedules = this.client.settings.get('schedules');
        if (!schedules.some(s => s.taskName === task)) {
            this.client.schedule.create(task, time);
        }
    }
};