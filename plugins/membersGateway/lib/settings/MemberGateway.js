const { GatewayStorage, Settings, util } = require('klasa');
const { Collection } = require('discord.js');

// This is just here to keep close to source until the source is fixed
const getIdentifier = (value) => {
    if (util.isPrimitive(value)) return value;
    if (util.isObject(value)) {
        if ('id' in value) return value.id;
        if ('name' in value) return value.name;
    }
    return null;
};

class MemberGateway extends GatewayStorage {
    constructor(store, type, schema, provider) {
        super(store.client, type, schema, provider);

        this.store = store;

        this.syncQueue = new Collection();

        Object.defineProperty(this, '_synced', { value: false, writable: true });
    }

    get Settings() {
        return Settings;
    }

    get idLength() {
        return 37;
    }

    get(id) {
        const [guildID, memberID] = typeof id === 'string' ? id.split('.') : id;

        const guild = this.client.guilds.get(guildID);
        if (guild) {
            const member = guild.members.get(memberID);
            return member && member.settings;
        }

        return undefined;
    }

    create(id, data = {}) {
        const [guildID, memberID] = typeof id === 'string' ? id.split('.') : id;
        const entry = this.get([guildID, memberID]);
        if (entry) return entry;

        const settings = new this.Settings(this, { id: `${guildID}.${memberID}`, ...data });
        if (this._synced) settings.sync();
        return settings;
    }

    async sync(input = this.client.guilds.reduce((keys, guild) => keys.concat(guild.members.map(member => member.settings.id)), [])) {
        if (Array.isArray(input)) {
            if (!this._synced) this._synced = true;
            const entries = await this.provider.getAll(this.type, input);
            for (const entry of entries) {
                if (!entry) continue;

                const cache = this.get(entry.id);
                if (!cache) continue;

                cache._existsInDB = true;
                cache._patch(entry);
            }

            for (const guild of this.client.guilds.values()) {
                for (const member of guild.members.values()) if (member.settings._existsInDB !== true) member.settings._existsInDB = false;
            }
            return this;
        }

        const target = getIdentifier(input);
        if (!target) throw new TypeError('The selected target could not be resolved to a string');

        const cache = this.get(target);
        return cache ? cache.sync() : null;
    }
}

module.exports = MemberGateway;