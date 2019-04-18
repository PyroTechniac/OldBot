const { Event } = require('klasa');
const { MessageEmbed } = require('discord.js');

module.exports = class extends Event {
    run(msg, cmd, responses) {
        if (responses && responses.length) {
            const { embed } = this;
            for (let i = 0; i < responses.length; i++) embed.addField(`Reason ${i + 1}`, responses);
            msg.sendEmbed(embed);
        }
    }

    get embed() {
        return new MessageEmbed()
            .setTitle('Command Inhibited')
            .setThumbnail(this.client.user.avatarURL())
            .setTimestamp();
    }
};