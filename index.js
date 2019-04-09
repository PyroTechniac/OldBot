const { KlasaClient } = require('klasa');
const dash = require('klasa-dashboard-hooks');
const members = require('klasa-member-gateway');
require('dotenv').config();

KlasaClient
    .use(dash)
    .use(members);

new KlasaClient({
    regexPrefix: /^(hey )?test(,|!)/i,
    commandEditing: true,
    commandMessageLifetime: 120,
    prefix: ['/', 't!'],
    providers: {
        default: 'json'
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
        port: 1234
    }
}).login(process.env.TOKEN);