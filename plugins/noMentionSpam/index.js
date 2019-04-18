const { Client: { plugin } } = require('klasa');

module.exports = {
    Client: require('./lib/Client'),
    [plugin]: require('./lib/Client')[plugin],
    NMSGuild: require('./lib/extensions/NMSGuild')
};