const { Event } = require('klasa');

module.exports = class extends Event {
    constructor(...args) {
        super(...args, { once: true });
    }

    async run() {
        this.client.schedule.create('cleanup', '@daily');
    }
};