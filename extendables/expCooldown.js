const { Extendable } = require('klasa');
const { User } = require('discord.js');

class UserExtender extends Extendable {
    constructor(...args) {
        super(...args, { appliesTo: [User] });
    }
}

module.exports = UserExtender;