const { KlasaClient } = require('klasa');
const { join } = require('path');
const ClientUtil = require('./structures/ClientUtil');

module.exports = class extends KlasaClient {
    constructor(config) {
        super(config);
        this.constructor[KlasaClient.plugin].call(this);
    }
    static [KlasaClient.plugin]() {
        const coreDirectory = join(__dirname, '../');
        this.util = new ClientUtil(this);
        this.extendables.registerCoreDirectory(coreDirectory);
    }
};