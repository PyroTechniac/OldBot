const { Monitor } = require('klasa');

module.exports = class extends Monitor {
    constructor(client, store, file, directory) {
        super(client, store, file, directory, { ignoreOthers: false, ignoreEdits: false });
    }

    async run(message) {
        if (!message.content) return null;
        const exec = message.content.match(/^((?:klasa )?docs(?:,|!| )?) ?(?:(master|stable))? ?(.+)/i);
        if (exec === null) return;
        const [, , branch = 'master', path] = exec;
        this.client.console.log(branch, path);
    }
};