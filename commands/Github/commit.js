const { Command } = require('klasa');
const fetch = require('node-fetch');
const { GITHUB_API_KEY } = process.env;
const { stripIndents } = require('common-tags');

module.exports = class extends Command {
    constructor(client, store, file, directory) {
        super(client, store, file, directory, {
            usage: '<commit:string{,40}>',
            usageDelim: ' ',
            description: 'Get information on a commit in a predefined repository',
            requiredPermissions: ['EMBED_LINKS'],
            runIn: ['text'],
            bucket: 2,
            cooldown: 3,
            cooldownLevel: 'author'
        });
        this.createCustomResolver('commit', (arg, possible, message) => {
            if (/\bgc[a-f0-9]{40}$/i.test(arg)) message.util.throw('An invalid commit was provided');
        });
    }

    async init() {
        if (!GITHUB_API_KEY) this.disable();
    }

    async run(message, [commit]) {
        const repository = message.guild.settings.get('repo');
        if (!repository) message.util.throw('The guild owner didn\'t set a GitHub repository yet');
        const owner = repository.split('/')[0];
        const repo = repository.split('/')[1];
        if (!owner || !repo) message.util.throw('The repository is invalid');
        let body;
        try {
            const res = await fetch(`https://api.github.com/repos/${owner}/${repo}/commits/${commit}`, {
                headers: { Authorization: `token ${GITHUB_API_KEY}` }
            });
            body = await res.json();
        } catch (error) {
            message.util.throw(`${this.client.user} couldn't find the requested information. Maybe try looking for another commit`);
        }
        if (!body || !body.commit) message.util.throw(`${this.client.user} couldn't find the requested information. Maybe try looking for another commit`);

        const embed = this.client.util.embed()
            .setColor(3447003)
            .setAuthor(
                body.author ? body.author.login ? body.author.login : 'Unknown' : 'Unknown',
                body.author ? body.author.avatar_url ? body.author.avatar_url : '' : '',
                body.author ? body.author.html_url ? body.author.html_url : '' : ''
            )
            .setTitle(body.commit.message.split('\n')[0])
            .setURL(body.html_url)
            .setDescription(
                `${body.commit.message
                    .replace('\r', '')
                    .replace('\n\n', '\n')
                    .split('\n')
                    .slice(1)
                    .join('\n')
                    .substring(0, 300)} ...
			`
            )
            .addField(
                'Stats',
                stripIndents`
					• Total: ${body.stats.total}
					• Additions: ${body.stats.additions}
					• Deletions: ${body.stats.deletions}
				`,
                true
            )
            .addField(
                'Committer',
                body.committer ? `• [**${body.committer.login}**](${body.committer.html_url})` : 'Unknown',
                true
            )
            .setThumbnail(body.author ? body.author.avatar_url : '')
            .setTimestamp(new Date(body.commit.author.date));

        if (!message.channel.permissionsFor(message.guild.me).has(['ADD_REACTIONS', 'MANAGE_MESSAGES'], false)) return message.util.embed(embed);
        const msg = await message.util.embed(embed);
        await msg.react('🗑');
        let react;
        try {
            react = await msg.awaitReactions(
                (reaction, user) => reaction.emoji.name === '🗑' && user.id === message.author.id,
                { max: 1, time: 10000, errors: ['time'] }
            );
        } catch (error) {
            msg.reactions.removeAll();

            return message;
        }

        react.first().message.delete();

        return message;
    }
};