const { Route } = require('klasa-dashboard-hooks');

module.exports = class extends Route {
    constructor(...args) {
        super(...args, { route: 'me' });
    }

    get(request, response) {
        return response.end(JSON.stringify(this.client.user));
    }
};