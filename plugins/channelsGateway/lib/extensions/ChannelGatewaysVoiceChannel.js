const { Structures } = require('discord.js');

module.exports = Structures.extend('VoiceChannel', VoiceChannel => {
    class ChannelGatewaysVoiceChannel extends VoiceChannel {
        constructor(...args) {
            super(...args);

            this.settings = this.client.options.channelGateways[this.type] ? this.client.gateways[`${this.type}Channel`].get(this.id, true) : null;
        }

        toJSON() {
            return { ...super.toJSON(), settings: this.settings ? this.settings.toJSON() : null };
        }
    }
    return ChannelGatewaysVoiceChannel;
});