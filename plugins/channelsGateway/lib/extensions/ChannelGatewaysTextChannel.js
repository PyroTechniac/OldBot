const { Structures } = require('discord.js');

module.exports = Structures.extend('TextChannel', TextChannel => {
    class ChannelGatewatsTextChannel extends TextChannel {
        constructor(...args) {
            super(...args);

            this.settings = this.client.options.channelGateways[this.type] ? this.client.gateways[`${this.type}Channel`].get(this.id, true) : null;
        }

        toJSON() {
            return { ...super.toJSON(), settings: this.settings ? this.settings.toJSON() : null };
        }
    }
    return ChannelGatewatsTextChannel;
});