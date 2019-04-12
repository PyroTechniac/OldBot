const { Event, Stopwatch } = require('klasa');

module.exports = class extends Event {
    constructor(client, store, file, directory) {
        super(client, store, file, directory, {
            event: 'commandUnknown',
            emitter: client,
            enabled: true,
            once: false
        });
    }
    async run(msg, command, prefix, length) {
        const tagCommand = this.client.commands.get('tag');
        const commandMessage = msg._registerCommand({ command: tagCommand, prefix, prefixLength: length });
        const timer = new Stopwatch();
        if (this.client.options.typing) msg.channel.startTyping();
        try {
            await this.client.inhibitors.run(msg, tagCommand);
            try {
                const commandRun = commandMessage.command.show(msg, [command]);
                timer.stop();
                const response = await commandRun;
                this.client.finalizers.run(msg, tagCommand, response, timer);
                this.client.emit('commandSuccess', msg, tagCommand, ['show', command], response);
            } catch (error) {
                this.client.emit('commandError', msg, tagCommand, ['show', command], error);
            }
        } catch (response) {
            this.client.emit('commandInhibited', msg, tagCommand, response);
        }
        if (this.client.options.typing) msg.channel.stopTyping();
    }
};