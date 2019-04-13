const { Extendable } = require('klasa');
const { User } = require('discord.js');

class UserExtender extends Extendable {
    constructor(...args) {
        super(...args, { appliesTo: [User] });
    }

    get cooldown() {
        return this.cooling;
    }

    set cooldown(value) {
        this.cooling = value;
    }
}

UserExtender.prototype.cooling = false;

module.exports = UserExtender;