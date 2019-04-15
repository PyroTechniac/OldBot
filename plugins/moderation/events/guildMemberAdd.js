const { Event } = require('klasa');
const MemberLog = require('../lib/structures/MemberLog');

module.exports = class extends Event {
    async run(guildMember) {
        const log = new MemberLog(guildMember.guild)
            .setType('joined')
            .setUser(guildMember.user)
            .send();
    }
};