const { Event } = require('klasa');

module.exports = class extends Event {
    constructor(client, store, file, directory) {
        super(client, store, file, directory, { once: true });
    }

    async run() {
        await this.client.documentation.init();
    }
};