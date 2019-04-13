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
    .add('minAccAge', 'integer', { default: 1800000 })
    .add('roles', folder => {
        folder
            .add('muted', 'Role');
    });
KlasaClient.defaultClientSchema
    .add('message', 'messagepromise')
    .add('timestamp', 'bigint', { default: 0 });
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