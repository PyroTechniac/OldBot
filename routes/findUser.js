const { Route } = require('klasa-dashboard-hooks');

module.exports = class extends Route {
    constructor(...args) {
        super(...args, { route: 'users/find/:username' });
    }

    get(request, response) {
        const { username } = request.params;
        const user = this.client.users.find(user => user.username === username);
        if (!user) return response.end('{}');
        return response.end(JSON.stringify(user));
    }
}