const { Command } = require('klasa');
const fetch = require('node-fetch');

module.exports = class extends Command {

    constructor(...args) {
        /**
         * Any default options can be omitted completely.
         * if all options are default, you can omit the constructor completely
         */
        super(...args, {
            enabled: true,
            runIn: ['text'],
            requiredPermissions: [],
            permissionLevel: 10,
            description: 'Test command'
        });
    }

    async run(message) {
        const test = await fetch(`https://botpyro-testing.herokuapp.com:1234/api/guilds/${message.guild.id}`)
            .then(res => res.json());

        this.client.console.log(test);
    }
};