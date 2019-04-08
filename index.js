const { KlasaClient } = require('klasa');
const dash = require('klasa-dashboard-hooks');
require('dotenv').config();

KlasaClient.use(dash);

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
    commandLogging: true
}).login(process.env.TOKEN);