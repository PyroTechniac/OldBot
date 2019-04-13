const { Command } = require('klasa');
const { MessageEmbed } = require('discord.js');
const qs = require('querystring');
const fetch = require('node-fetch');
const Turndown = require('turndown');
module.exports = class extends Command {
    constructor(client, store, file, directory) {
        super(client, store, file, directory, {
            description: 'Searches MDN for the specified string',
            usage: '<queryString:string>',
            usageDelim: ' '
        });
    }
    async parse(query) {
        return query ? query.replace(/#/g, '.prototype') : null;
    }
    async run(message, [query]) {
        const parsed = await this.parse(query);
        const queryString = qs.stringify({ q: parsed });
        const res = await fetch(`https://mdn.pleb.xyz/search?${queryString}`);
        const body = await res.json();
        if (!body.URL || !body.Title || !body.Summary) {
            return message.send(`I couldn't find anything on MDN for ${parsed}, please try your search again`);
        }
        const turndown = new Turndown();
        turndown.addRule('hyperlink', {
            filter: 'a',
            replacement: (text, node) => `[${text}](https://developer.mozilla.org/${node.href})`
        });

        const summary = body.Summary.replace(/<code><strong>(.+)<\/strong><\/code>/g, '<strong><code>$1<\/code><\/strong>'); // eslint-disable-line no-useless-escape

        const embed = new MessageEmbed()
            .setColor(0x066FAD)
            .setAuthor('MDN', 'https://i.imgur.com/DFGXabG.png', 'https://developer.mozilla.org/')
            .setURL(`https://developer.mozilla.org${body.URL}`)
            .setTitle(body.Title)
            .setDescription(turndown.turndown(summary));
        return message.sendEmbed(embed);
    }
};