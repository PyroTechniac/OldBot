const { Client: { plugin } } = require('klasa');

module.exports = {
    [plugin]: require('./lib/Client')[plugin]
};