const { Route } = require('klasa-dashboard-hooks');

module.exports = class extends Route {
    constructor(client, store, file, directory) {
        super(client, store, file, directory, {
            route: 'guilds/:guildID/emojis'
        });
    }

    get(request, response) {
        const { guildID } = request.params;
        const guild = this.client.guilds.get(guildID);
        if (!guild) return response.end('[]');
        return response.end(JSON.stringify(guild.emojis.keyArray()));
    }
};