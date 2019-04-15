const { Client } = require('klasa');
const { join } = require('path');

Client.defaultPermissionLevels
    .add(4, ({ guild, member }) => guild && member.permissions.has('KICK_MEMBERS'))
    .add(5, ({ guild, member }) => guild && member.permissions.has('BAN_MEMBERS'));

Client.defaultGuildSchema
    .add('channels', folder => folder
        .add('modlog', 'TextChannel'))
    .add('antiinvite', 'boolean', { default: false })
    .add('modlogs', 'any', { array: true });
class ModClient extends Client {
    constructor(options) {
        super(options);
        this.constructor[Client.plugin].call(this);
    }

    static [Client.plugin]() {
        const coreDirectory = join(__dirname, '..', '/');
        this.commands.registerCoreDirectory(coreDirectory);
        this.monitors.registerCoreDirectory(coreDirectory);
        this.languages.registerCoreDirectory(coreDirectory);
        this.events.registerCoreDirectory(coreDirectory);
    }
}

module.exports = ModClient;