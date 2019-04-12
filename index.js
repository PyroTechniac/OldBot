const { KlasaClient } = require('klasa');
require('dotenv').config();

KlasaClient
    .use(require('klasa-dashboard-hooks'))
    .use(require('./plugins/tags'))
    .use(require('./plugins/functions'))
    .use(require('./plugins/channelsGateway'))
    .defaultGuildSchema
    .add('deleteCommand', 'boolean', { default: false })
    .add('antiinvite', 'boolean', { default: false })
    .add('roles', folder => {
        folder
            .add('muted', 'Role');
    });
new KlasaClient({
    regexPrefix: /^(hey )?starlight(,|!)/i,
    commandEditing: true,
    commandMessageLifetime: 120,
    prefix: ['/', 's!'],
    providers: {
        default: 'mongodb',
        mongodb: {
            connectionString: process.env.DB_STRING
        }
    },
    consoleEvents: {
        verbose: true,
        log: true,
        error: true,
        warn: true,
        wtf: true
    },
    commandLogging: true,
    dashboardHooks: {
        port: process.env.PORT
    }
}).login(process.env.TOKEN);