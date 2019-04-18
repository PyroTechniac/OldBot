const { Monitor } = require('klasa');

module.exports = class extends Monitor {
    constructor(client, store, file, directory) {
        super(client, store, file, directory, { ignoreOthers: false, ignoreEdits: false });
    }

    async run(message) {
        if (!message.content) return null;
        let placeholder1, placeholder2, branch, path;
        try {
            [placeholder1, placeholder2, branch = 'master', path] = message.content.match(/^((?:klasa )?docs(?:,|!| )?) ?(?:(master|stable))? ?(.+)/i);
            this.client.console.log(branch, path);
            return null;
        } catch (error) {
            return null;
        }
    }
};