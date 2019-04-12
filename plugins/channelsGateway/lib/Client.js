const { Client, Schema, Settings, util } = require('klasa');
const { join } = require('path');
const GuildChannelGateway = require('./settings/gateways/GuildChannelGateway.js');
const { OPTIONS } = require('./util/constants');

Client.defaultTextChannelSchema = new Schema();
Client.defaultVoiceChannelSchema = new Schema();
Client.defaultCategoryChannelSchema = new Schema();

class ChannelGatewaysClient extends Client {
    constructor(options) {
        super(options);
        this.constructor[Client.plugin].call(this);
    }

    static [Client.plugin]() {
        util.mergeDefault(OPTIONS, this.options);

        const coreDirectory = join(__dirname, '..', '/');

        this.commands.registerCoreDirectory(coreDirectory);

        const { channelGateways, gateways } = this.options;
        const { categoryChannel, textChannel, voiceChannel } = gateways;

        categoryChannel.schema = 'schema' in categoryChannel ? categoryChannel.schema : Client.defaultCategoryChannelSchema;
        textChannel.schema = 'schema' in textChannel ? textChannel.schema : Client.defaultTextChannelSchema;
        voiceChannel.schema = 'schema' in voiceChannel ? voiceChannel.schema : Client.defaultVoiceChannelSchema;

        categoryChannel.provider = 'provider' in categoryChannel ? categoryChannel.provider : this.options.providers.default;
        textChannel.provider = 'provider' in textChannel ? textChannel.provider : this.options.providers.default;
        voiceChannel.provider = 'provider' in voiceChannel ? voiceChannel.provider : this.options.providers.default;

        if (channelGateways.category) {
            this.gateways.categoryChannel = new GuildChannelGateway(this.gateways, 'categoryChannel', categoryChannel.schema, categoryChannel.provider);
            this.gateways.keys.add('categoryChannel');
            this.gateways._queue.push(this.gateways.categoryChannel.init.bind(this.gateways.categoryChannel));
        }

        if (channelGateways.text) {
            this.gateways.textChannel = new GuildChannelGateway(this.gateways, 'textChannel', textChannel.schema, textChannel.provider);
            this.gateways.keys.add('textChannel');
            this.gateways._queue.push(this.gateways.textChannel.init.bind(this.gateways.textChannel));
        }

        if (channelGateways.voice) {
            this.gateways.voiceChannel = new GuildChannelGateway(this.gateways, 'voiceChannel', voiceChannel.schema, voiceChannel.provider);
            this.gateways.keys.add('voiceChannel');
            this.gateways._queue.push(this.gateways.voiceChannel.init.bind(this.gateways.voiceChannel));
        }
    }
}

module.exports = ChannelGatewaysClient;