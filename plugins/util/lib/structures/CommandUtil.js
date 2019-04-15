const { MessageEmbed, APIMessage } = require('discord.js');
const { KlasaMessage, KlasaClient } = require('klasa');

class CommandUtil {
    constructor(message) {
        /**
         * The message that was sent
         * @type {KlasaMessage}
         */
        this.message = message;

        /**
         * The client for the util
         * @type {KlasaClient}
         */
        this.client = this.message.client;
    }

    send(content, options) {
        return this.message.sendMessage(content, options);
    }

    embed(embed, content, options) {
        if (embed instanceof MessageEmbed) return this.message.sendMessage(APIMessage.transformOptions(content, options, { embed }));
        else return this.message.sendMessage(APIMessage.transformOptions(content, options, { embed: this.client.util.embed(embed) }));
    }

    code(code, content, options) {
        return this.message.sendMessage(APIMessage.transformOptions(content, options, { code }));
    }

    locale(key, localeArgs = [], options = {}) {
        if (!Array.isArray(localeArgs)) [options, localeArgs] = [localeArgs, []];
        return this.message.sendMessage(APIMessage.transformOptions(this.message.language.get(key, ...localeArgs), undefined, options));
    }

    reply(content, options) {
        return this.message.sendMessage(APIMessage.transformOptions(content, options, { reply: this.message.member || this.message.author }));
    }
}

module.exports = CommandUtil;