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
        this.options.docs = util.mergeDefault(DEFAULTS, this.options.docs);
        const coreDirectory = join(__dirname, '..', '/');

        this.events.registerCoreDirectory(coreDirectory);
        this.monitors.registerCoreDirectory(coreDirectory);

        this.documentation = new Documentation(this, this.options.docs.repository, this.options.docs.jsonBranch, this.options.docs.branches);
    }
}

module.exports = DocsClient;