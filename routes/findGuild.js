const { Route } = require('klasa-dashboard-hooks');
const findInexact = (name) => {
    return guild => guild.name.toLowerCase().includes(name);
};
const findExact = (name) => {
    return guild => guild.name.toLowerCase() === name;
};

module.exports = class extends Route {
    constructor(...args) {
        super(...args, { route: 'find/guilds/:guildName' });
    }

    get(request, response) {
        const { guildName } = request.params;
        let guilds = this.client.guilds.filter(guild => guild.name.toLowerCase().includes(guildName.toLowerCase()));
        if (guilds.size === 0) return response.end('{}');
        if (guilds.size === 1) return response.end(JSON.stringify(guilds.first()));
        if (guilds.size > 1) guilds = guilds.filter(guild => guild.name.toLowerCase() === guildName.toLowerCase());

        if (guilds.size === 0 || guilds.size > 1) return response.end('{}');
        return response.end(JSON.stringify(guilds.first()));
    }
};