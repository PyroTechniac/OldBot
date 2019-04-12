const { Util: { escapeMarkdown } } = require('discord.js');
const { Command } = require('klasa');

module.exports = class extends Command {
    constructor(client, store, file, directory) {
        super(client, store, file, directory, {
            description: 'Allows you to create, remove, or show tags',
            subcommands: true,
            usage: '<add|remove|source|list|show:default> (tag:string) [content:...string]',
            usageDelim: ' '
        });

        this.createCustomResolver('string', (arg, possible, message, [action]) => {
            if (action === 'list') return arg;
            return this.client.arguments.get('string').run(arg, possible, message);
        });
    }

    async add(message, [tag, content]) {
        await message.guild.settings.update('tags', [...message.guild.settings.get('tags'), [tag, content]], { action: 'overwrite' });
        return message.sendMessage(`Added the tag \`${tag}\` with content: \`\`\`${escapeMarkdown(content)}\`\`\``);
    }

    async remove(message, [tag]) {
        const filtered = (message.guild.settings.get('tags').filter(([name]) => name !== tag));
        await message.guild.settings.update('tags', filtered, { action: 'overwrite' });
        return message.sendMessage(`Removed the tag \`${tag}\``);
    }

    list(message) {
        return message.sendMessage(`Tags for this guild are: ${message.guild.settings.get('tags').map(([name]) => name).join(', ')}`);
    }

    show(message, [tag]) {
        const emote = message.guild.settings.get('tags').find((name) => name[0].toLowerCase() === tag);
        if (!emote) return null;
        return message.send(emote[1]);
    }

    source(message, [tag]) {
        const emote = message.guild.settings.get('tags').find((name) => name[0].toLowerCase() === tag);
        if (!emote) return null;
        return message.sendMessage(`\`\`\`${escapeMarkdown(emote[1])}\`\`\``);
    }
};