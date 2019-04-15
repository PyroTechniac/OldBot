const { Extendable } = require('klasa');
const { GuildMember } = require('discord.js');

module.exports = class extends Extendable {
    constructor(client, store, file, directory) {
        super(client, store, file, directory, { appliesTo: [GuildMember] });
    }

    get username() {
        return this.user.username;
    }

    get tag() {
        return this.user.tag;
    }

    get discriminator() {
        return this.user.discriminator;
    }

    get bot() {
        return this.user.bot;
    }
};