const { Client, Client: { plugin }, util: { mergeDefault } } = require('klasa');
const { join } = require('path');
const { OPTIONS } = require('./util/constants');

Client.defaultGuildSchema
    .add('no-mention-spam', folder => folder
        .add('enabled', 'boolean', { default: false })
        .add('mentionsAllowed', 'number', { default: 25 })
        .add('timePeriod', 'number', { default: 7 }));

class NoMentionSpamClient extends Client {
    constructor(options) {
        super(options);
        this.constructor[plugin].call(this);
    }

    static [plugin]() {
        mergeDefault(OPTIONS, this.options);

        const coreDirectory = join(__dirname, '..', '/');

        this.monitors.registerCoreDirectory(coreDirectory);
        this.events.registerCoreDirectory(coreDirectory);
    }
}

module.exports = NoMentionSpamClient;