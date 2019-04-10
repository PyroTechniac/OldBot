const { Route } = require('klasa-dashboard-hooks');

module.exports = class extends Route {
    constructor(client, store, file, directory) {
        super(client, store, file, directory, {
            route: 'guilds/:guildID/emoji/:emojiID'
        });
    }
    get(request, response) {
        const { guildID, emojiID } = request.params;
        const guild = this.client.guilds.get(guildID);
        if (!guild) return response.end('{}');
        const emoji = guild.emojis.get(emojiID);
        if (!emoji) return response.end('{}');
        return response.end(JSON.stringify(emoji));
    }
};