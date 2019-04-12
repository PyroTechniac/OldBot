const { Structures } = require('discord.js');

module.exports = Structures.extend('CategoryChannel', CategoryChannel => {
    class ChannelGatewaysCategoryChannel extends CategoryChannel {
        constructor(...args) {
            super(...args);

            this.settings = this.client.options.channelGateways[this.type] ? this.client.gateways[`${this.type}Channel`].get(this.id, true) : null;
        }

        toJSON() {
            return { ...super.toJSON(), settings: this.settings ? this.settings.toJSON() : null };
        }
    }
    return ChannelGatewaysCategoryChannel;
});