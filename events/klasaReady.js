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

        await this.ensureTask('cleanup', '@daily');
    }

    async ensureTask(task, time) {
        const { tasks } = this.client.schedule;
        for (const s of tasks) {
            if (s.taskName === task) continue;
            await this.client.schedule.create(task, time);
        }
    }
};