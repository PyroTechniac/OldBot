const { Command } = require('klasa');

module.exports = class extends Command {
    constructor(client, store, file, directory) {
        super(client, store, file, directory, {
            description: 'Play a game of rock, paper, scissors with the bot.',
            usage: '<rock|r|paper|p|scissors|s>'
        });
        this.possibilities = {
            rock: {
                rock: '✊, Oh man it is a tie!',
                paper: '✊, you just got lucky is all. 😢 You won\'t beat me again',
                scissor: '✊, I win! You lose! 💪'
            },
            paper: {
                rock: '✋, I win! You lose! 💪',
                paper: '✋, Oh man it is a tie!',
                scissor: '✋, you just got lucky is all. 😢 You won\'t beat me again'
            },
            scissor: {
                rock: '✌, you just got lucky is all. 😢 You won\'t beat me again',
                paper: '✌, I win! You lose! 💪',
                scissor: '✌, Oh man it is a tie!'
            }
        };
    }
    async run(message, [userAction]) {
        /* eslint-disable indent */
        switch (userAction) {
            case 'r': { userAction = 'rock'; break; }
            case 's': { userAction = 'scissor'; break; }
            case 'p': { userAction = 'paper'; break; }
        }
        /* eslint-enable indent */
        const botAction = Object.keys(this.possibilities)[Math.floor(Math.random() * 3)];

        return message.util.send(this.possibilities[botAction][userAction]);
    }
};