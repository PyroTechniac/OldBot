const { Event } = require('klasa');

module.exports = class extends Event {
    async run(msg) {
        await msg.guild.members.ban(msg.author.id, { days: 7, reason: 'Automatic: Mention Spam threshold exceeded' });
        return msg.send(`${msg.author} has been banned for exceeding this guild's mention spam threshold`);
    }
};