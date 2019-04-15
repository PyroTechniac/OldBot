const { MessageEmbed } = require('discord.js');

class MemberLog {
    constructor(guild) {
        this.guild = guild;
        this.client = guild.client;

        this.type = null;
        this.user = null;
    }

    setType(type) {
        this.type = type;
        return this;
    }

    setUser(user) {
        this.user = {
            id: user.id,
            tag: user.tag,
            avatar: user.displayAvatarURL()
        };
        return this;
    }

    async send() {
        const channel = this.guild.channels.find(ch => ch.name === 'member-log' && ch.type === 'text');
        if (!channel) return;
        if (!channel.postable) return;
        return channel.send({ embed: this.embed });
    }

    get embed() {
        const embed = new MessageEmbed()
            .setAuthor(`${this.user.tag} (${this.user.id})`, this.user.avatar)
            .setColor(MemberLog.color(this.type))
            .setFooter(`User ${this.type}`)
            .setTimestamp();
        return embed;
    }

    static color(type) {
        /* eslint-disable indent */
        switch (type) {
            case 'joined': return 1822618;
            case 'left': return 16564545;
        }
        /* eslint-enable indent */
    }
}

module.exports = MemberLog;