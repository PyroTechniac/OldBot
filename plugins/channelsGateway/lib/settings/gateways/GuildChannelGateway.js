const { GuildChannel } = require('discord.js');
const { Settings, Gateway } = require('klasa');

module.exports = class GuildChannelGateway extends Gateway {
    constructor(...args) {
        super(...args);

        this._synced = false;
    }

    get(id, create) {
        const channel = this.client.channels.get(id);
        if (channel && channel.type === this.type.split('Channel')[0]) return channel.settings;
        if (create) {
            const settings = new this.Settings(this, { id });
            if (this._synced && this.schema.size) settings.sync(true).catch(error => this.client.emit('error', error));
            return settings;
        }
        return null;
    }

    async sync(input = this.client.channels.reduce((acc, current) => current.type === this.type.split('Channel')[0] ? acc.concat(current.id) : acc, [])) {
        if (Array.isArray(input)) {
            if (!this._synced) this._synced = true;
            const entries = await this.provider.getAll(this.type);
            for (const entry of entries) {
                if (!entry) continue;

                const settings = this.get(entry.id);
                if (!settings) continue;
                if (!settings._existsInDB) settings._existsInDB = true;
                settings._patch(entry);
            }

            for (const channel of this.client.channels.values()) {
                if (channel.type === this.type.split('Channel')[0] && !channel.settings._existsInDB) channel.settings._existsInDB = false;
            }
            return this;
        }

        const cache = this.get((input && input.id) || input);
        return cache ? cache.sync(true) : null;
    }
};