const { Extendable, KlasaMessage } = require('klasa');
const CommandUtil = require('../lib/structures/CommandUtil');

module.exports = class extends Extendable {
    constructor(client, store, file, directory) {
        super(client, store, file, directory, { appliesTo: [KlasaMessage] });
    }

    _registerCommand({ command, prefix, prefixLength }) {
        this.util = new CommandUtil(this);
        this.command = command;
        this.prefix = prefix;
        this.prefixLength = prefixLength;
        this.prompter = this.command.usage.createPrompt(this, {
            quotedStringSupport: this.command.quotedStringSupport,
            time: this.command.promptTime,
            limit: this.command.promptLimit
        });
        this.client.emit('commandRun', this, this.command, this.args);
        return this;
    }
};