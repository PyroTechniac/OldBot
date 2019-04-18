const { Monitor } = require('klasa');
const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');
class Issue extends Monitor {
    constructor(client, store, file, directory) {
        super(client, store, file, directory, {
            ignoreEdits: false,
            ignoreOthers: false,
            enabled: false
        });
        this.colors = {
            pullRequests: {
                open: 0x2CBE4E,
                closed: 0xCB2431,
                merged: 0x6F42C1
            },
            issues: {
                open: 0xD1D134,
                closed: 0x2D32BE
            }
        };
    }

    async run(message) {
        const exec = Issue.regex.exec(message.content);

        if (exec === null) return;
        const id = exec[1];
        let response, reacter;

        try {
            await message.react('🔖');
            reacter = await message.awaitReactions((reaction, user) => reaction.emoji.name === '🔖' && !user.bot, {
                time: 30000,
                max: 1,
                errors: ['time']
            }).then(r => r.first().users.find(u => !u.bot));

            let data = await fetch(`https://api.github.com/repos/${this.client.documentation.repository}/pulls/${exec[1]}`)
                .then(res => res.json());

            if (data.message !== 'Not Found') {
                response = this.pullRequest(data);
            } else {
                data = await fetch(`https://api.github.com/repos/${this.client.documentation.repository}/issues/${exec[1]}`)
                    .then(res => res.json());

                if (data.message !== 'Not Found') response = this.issue(data);
            }
        } catch (err) {
            // Noop
        }
    }
}

Issue.regex = /(?:^|\s)#(\d+)\b/;

module.exports = Issue;