const { Command } = require('klasa');

module.exports = class extends Command {
    constructor(client, store, file, directory) {
        super(client, store, file, directory, {
            aliases: ['instant-invite', 'inv'],
            autoAliases: true,
            permissionLevel: 6,
            requiredPermissions: ['CREATE_INSTANT_INVITE'],
            cooldown: 60 * 30,
            usage: '[Channel:channel] [Duration:integer] [Max:integer]',
            usageDelim: ' ',
            description: 'Creates an instant invite for the channel',
            extendedHelp: [
                'This command will make an instant invite in the channel it is used in, or a tagged channel',
                'Duration is how long the invite should last in seconds, and max is how many uses the command will have',
                'Default for duration is 86400 (24 hours) and max uses defaults to 1',
                'If the --unique flag is used, the invite will be unique, and won\'t be copied from another invite'
            ].join('\n'),
            runIn: ['text']
        });
    }
    async run(msg, [channel = msg.channel, duration = 86400, maxUses = 1]) {
        const invite = await channel.createInvite({
            temporary: false,
            maxAge: duration,
            maxUses,
            unique: 'unique' in msg.flags,
            reason: `Generated by ${msg.author.tag}`
        });
        return msg.sendMessage(`Generated invite: ${invite}\nMax uses: ${invite.maxUses}\nTime until expiring: ${invite.maxAge}\nChannel: ${invite.channel}`);
    }
};