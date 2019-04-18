const { Client, util } = require('klasa');
const { join } = require('path');
const { DEFAULTS } = require('./util/Constants');
const Documentation = require('./structures/Documentation');

Client.defaultPermissionLevels
    .add(8, ({ client, author }) => client.settings.staff.includes(author.id));

Client.defaultClientSchema
    .add('staff', 'User', { array: true });

class DocsClient extends Client {
    constructor(options) {
        super(options);
        this.constructor[Client.plugin].call(this);
    }

    static [Client.plugin]() {
        util.mergeDefault(DEFAULTS, this.options.docs);
        const coreDirectory = join(__dirname, '..', '/');

        this.events.registerCoreDirectory(coreDirectory);
        this.languages.registerCoreDirectory(coreDirectory);
        this.monitors.registerCoreDirectory(coreDirectory);
        this.commands.registerCoreDirectory(coreDirectory);

        this.documentation = new Documentation(this, this.options.repository, this.options.jsonBranch, this.options.branches);
    }
}

module.exports = DocsClient;