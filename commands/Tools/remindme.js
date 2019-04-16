const { Command, RichDisplay, Timestamp } = require('klasa');

module.exports = class extends Command {
    constructor(client, store, file, directory) {
        super(client, store, file, directory, {
            name: 'reminder',
            cooldown: 30,
            bucket: 1,
            deletable: true,
            guarded: false,
            nsfw: false,
            subcommands: true,
            aliases: ['remind-me'],
            autoAliases: true,
            description: 'Creates a reminder.',
            quotedStringSupport: false,
            usage: '<add|delete|list> (id:id) (duration:duration) (text:text) [...]',
            usageDelim: ' '
        });
        this.createCustomResolver('id', (arg, possible, message, [action]) => {
            if (action === 'delete') return this.client.arguments.get('string').run(arg, possible, message);
            return undefined;
        });
        this.createCustomResolver('duration', (arg, possible, message, [action]) => {
            if (['list', 'delete'].includes(action)) return true;
            return this.client.arguments.get('time').run(arg, possible, message);
        });
        this.createCustomResolver('text', (arg, possible, message, [action]) => {
            if (['list', 'delete'].includes(action)) return true;
            return this.client.arguments.get('string').run(arg, possible, message);
        });
    }

    async list(message) {
        const reminders = this.client.settings.schedules.filter(t => t.data.user === message.author.id);
        if (!reminders || reminders.length < 1) message.util.throw('You have no reminders set');
        const ts = new Timestamp('LLL');
        const display = new RichDisplay(this.client.util.embed().setColor([132, 61, 164]).setAuthor(`Reminders for ${message.author.tag}`, message.author.displayAvatarURL({ size: 2048 })));
        reminders.forEach(r => {
            display.addPage(e => e.setDescription(`**ID:** \`${r.id}\`\n**Text:** ${r.data.text}\n**Time:** ${ts.display(r.time)}\n**Recurring:** ${r.recurring ? 'Yes' : 'No'}`));
        });
        await display.run(message, { filter: (reaction, user) => user === message.author });
    }

    async delete(message, id) {
        const reminder = this.client.schedule.get(id[0]);
        if (!reminder) message.util.throw('I don\'t have any reminders with that ID');
        if (reminder.data.user !== message.author.id) message.util.throw('You can\'t delete someone elses reminders');
        await reminder.delete();
        return message.util.send(`Deleted reminder ${id}`);
    }

    async add(message, [id, duration, ...text]) {
        const reminder = await this.client.schedule.create('reminder', duration, {
            data: {
                user: message.author.id,
                channel: message.guild ? message.channel.id : null,
                text: text.join(' ')
            },
            catchUp: true
        });
        return message.util.send(`I've created a reminder with ID ${reminder.id} - I'll DM you ${message.guild ? '(and send a message here) ' : ''}when it's time`);
    }
};