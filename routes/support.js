const { Route } = require('klasa-dashboard-hooks');

module.exports = class extends Route {
    constructor(...args) {
        super(...args, { route: 'me/support' });
    }

    get(request, response) {
        let mainChannel = this.client.settings.get('mainChannel');
        if (!mainChannel) return response.end('{}');
        mainChannel = this.client.channels.get(mainChannel);
        mainChannel.createInvite({ unique: true, maxUses: 1, maxAge: 120 }).then(invite => {
            return response.end(JSON.stringify({ invite }));
        });
    }
};