const { Store } = require('klasa');
const Function = require('./Function');

class FunctionStore extends Store {
    constructor(client, coreDirectory) {
        super(client, 'functions', Function);
        this.registerCoreDirectory(coreDirectory);
    }
}

module.exports = FunctionStore;