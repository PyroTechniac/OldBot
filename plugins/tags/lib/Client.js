const { Client } = require('klasa');
const { join } = require('path');
Client.defaultGuildSchema.add('tags', 'any', { array: true });

class TagsClient extends Client {
    constructor(config) {
        super(config);
        this.constructor[Client.plugin].call(this);
    }

    static [Client.plugin]() {
        const coreDirectory = join(__dirname, '../');
        this.commands.registerCoreDirectory(coreDirectory);
        this.events.registerCoreDirectory(coreDirectory);
    }
}

module.exports = TagsClient;