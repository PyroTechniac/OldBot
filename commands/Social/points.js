const { Command } = require('klasa');
const { MessageEmbed } = require('discord.js');

module.exports = class extends Command {
    constructor(...args) {
        super(...args, { description: 'Check how many points you have', aliases: ['xp', 'exp', 'experience'], runIn: ['text'], requiredSettings: ['levelling'] });
    }

    async run(message) {
        const embed = new MessageEmbed()
            .setAuthor(message.member.displayName, message.author.displayAvatarURL())
            .setColor(message.member.displayColor)
            .addField('Level', `${message.author.settings.level}`)
            .addField('Experience', `${message.author.settings.experience}`);

        await message.util.embed(embed);
    }
};