const { Command } = require('klasa');
const fetch = require('node-fetch');
const { MessageEmbed } = require('discord.js');
const docs = 'https://djsdocs.sorta.moe/';
const qs = require('querystring');
module.exports = class extends Command {
    constructor(client, store, file, directory) {
        super(client, store, file, directory, {
            description: 'Searches the Discord docs for something',
            aliases: ['djs'],
            usage: '<searchQuery:string>',
            usageDelim: ' ',
            runIn: ['text'],
            requiredPermissions: ['EMBED_LINKS', 'ADD_REACTIONS', 'MANAGE_MESSAGES']
        });
    }
    async run(message, [query]) {
        const queryString = qs.stringify({ q: query });
        const res = await fetch(`${docs}main/master/embed?${queryString}`);
        const embed = await res.json();
        if (!embed) throw 'There wasn\'t anything in the docs about that';
        const msg = await message.util.embed(embed);
        await msg.react('🗑');
        let react;
        try {
            react = await msg.awaitReactions((reaction, user) => reaction.emoji.name === '🗑' && user.id === message.author.id,
                { max: 1, time: 5000, errors: ['time'] });
        } catch (error) {
            await msg.reactions.removeAll();

            return message;
        }
        react.first().message.delete();

        return message;
    }
};