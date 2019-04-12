const { Client: { plugin } } = require('klasa');

module.exports = {
    Client: require('./lib/Client'),
    ChannelGatewaysCategoryChannel: require('./lib/extensions/ChannelGatewaysCategoryChannel'),
    ChannelGatewaysVoiceChannel: require('./lib/extensions/ChannelGatewaysVoiceChannel'),
    ChannelGatewaysTextChannel: require('./lib/extensions/ChannelGatewaysTextChannel'),
    [plugin]: require('./lib/Client')[plugin]
};