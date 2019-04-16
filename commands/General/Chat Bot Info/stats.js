const { Command } = require('klasa');
const { stripIndents } = require('common-tags');
const moment = require('moment');
require('moment-duration-format');

const { version } = require('../../../package.json');

module.exports = class extends Command {
    constructor(client, store, file, directory) {
        super(client, store, file, directory, {
            description: 'Displays statistics about the bot.',
            requiredPermissions: ['EMBED_LINKS'],
            cooldown: 3,
            bucket: 2
        });
    }

    run(message) {
        const embed = this.client.util.embed()
            .setColor([132, 61, 164])
            .setDescription(`**${this.client.user.username} Statistics**`)
            .addField('❯ Uptime', moment.duration(this.client.uptime).format('d[d ]h[h ]m[m ]s[s]'), true)
            .addField('❯ Memory Usage', `${Math.round(process.memoryUsage().heapUsed / 1024 / 1024)}MB`, true)
            .addField(
                '❯ General Stats',
                stripIndents`
				• Guilds: ${this.client.guilds.size}
				• Channels: ${this.client.channels.size}
			`,
                true
            )
            .addField('❯ Version', `v${version}`, true)
            .addField('❯ Source Code', '[View Here](https://github.com/PyroTechniac/Starlight)', true)
            .addField(
                '❯ Library',
                '[discord.js](https://discord.js.org)[-klasa](https://github.com/dirigeants/klasa)',
                true
            )
            .setThumbnail(this.client.user.displayAvatarURL())
            .setFooter(`© 2019 ${this.client.owner.tag}`);

        return message.util.embed(embed);
    }
};