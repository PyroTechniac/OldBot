const { Client: { plugin } } = require('klasa');
module.exports = {
    Client: require('./lib/Client'),
    Function: require('./lib/structures/Function'),
    FunctionStore: require('./lib/structures/FunctionStore'),
    [plugin]: require('./lib/Client')[plugin]
};