const { Monitor } = require('klasa');

module.exports = class extends Monitor {
    constructor(...args) {
        super(...args, { ignoreOthers: false });
    }

    async run(message) {
        if (!message.guild) return;

        if (!message.guild.settings.levelling) return;

        if (message.member.settings.get('cooling')) return;

        const nextValue = message.member.settings.experience + 1;

        const currentLevel = message.member.settings.level;

        const nextLevel = Math.floor(0.1 * Math.sqrt(nextValue + 1));

        await Promise.all([
            message.member.settings.update('experience', nextValue),
            message.member.settings.update('level', nextLevel),
            message.member.settings.update('cooling', true)
        ]);

        // await message.member.settings.update([['experience', nextValue], ['level', nextLevel], ['cooling', true]]);

        await this.client.schedule.create('cooldown', Date.now() + (1000 * 60), {
            data: {
                user: message.member
            },
            catchUp: true
        });

        if (currentLevel !== nextLevel) await message.send(`Congradulations! You leveled up to level **${currentLevel}**!`);
    }
};