const { Task } = require('klasa');

module.exports = class extends Task {
    constructor(...args) {
        super(...args);
    }

    async run(data) {
        const guild = this.client.guilds.get(data.guildID);
        if (!guild) return;
        const member = this.client.util.resolveMember(data.memberID, guild.members);
        if (!member) return;
        await member.settings.update('cooling', false);
    }
};