const { Route } = require('klasa-dashboard-hooks');

module.exports = class extends Route {
    constructor(...args) {
        super(...args, { route: 'invite' });
    }

    get(request, response) {
        return response.end(JSON.stringify({ invite: this.client.invite }));
    }
};