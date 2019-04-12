// Copyright (c) 2017-2019 dirigeants. All rights reserved. MIT license.
const { Extendable } = require('klasa');
const { DMChannel, TextChannel } = require('discord.js');

module.exports = class extends Extendable {
    constructor(...args) {
        super(...args, { appliesTo: [DMChannel, TextChannel] });
    }

    async fetchImage() {
        const messageBank = await this.messages.fetch({ limit: 20 });

        for (const message of messageBank.values()) {
            const fetchedImage = message.attachments.first();
            if (fetchedImage && fetchedImage.height) return fetchedImage;
        }

        throw 'Couldn\'t find an image';
    }
};