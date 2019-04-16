const { Event } = require('klasa');

module.exports = class extends Event {
    constructor(...args) {
        super(...args, { once: true });
    }

    async run() {
        await this.ensureTask('cleanup', '@daily');
        await this.client.user.setPresence({
            activity: {
                type: 'PLAYING',
                name: 'Starlight, help'
            }
        });
    }

    async ensureTask(task, time) {
        const { tasks } = this.client.schedule;
        for (const s of tasks) {
            if (s.taskName === task) {
                this.client.emit(`Skipping task ${task}`);
                continue;
            }
            this.client.emit('log', `Creating task ${task}`);
            await this.client.schedule.create(task, time);
        }
    }
};