const { Task } = require('klasa');

module.exports = class extends Task {
    constructor(...args) {
        super(...args);
    }

    async run(data) {
        await data.user.settings.update('cooling', false);
    }
};