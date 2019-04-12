const { Client, util } = require('klasa');
const { join } = require('path');
const FunctionStore = require('./structures/FunctionStore');
const { OPTIONS } = require('./util/constants');

class FunctionsClient extends Client {
    constructor(options) {
        super(options);
        this.constructor[Client.plugin].call(this);
    }

    static [Client.plugin]() {
        util.mergeDefault(OPTIONS, this.options);

        const coreDirectory = join(__dirname, '..', '/');

        this.functions = new FunctionStore(this, coreDirectory);

        this.registerStore(this.functions);

        const { options } = this;
        const { returnMethod } = options.aliasFunctions;

        if (options.aliasFunctions.enabled && options.aliasFunctions.prefix) {
            if (options.aliasFunctions.prefix === 'functions') throw new Error('[Functions-Plugin] "functions" is not a valid alias prefix option');

            this[options.aliasFunctions.prefix] = new Proxy(this.functions, {
                get(target, prop) {
                    if (prop === Symbol.iterator) return target[Symbol.iterator].bind(target);
                    return target.has(prop)
                        ? returnMethod
                            ? target.get(prop)[returnMethod]
                            : target.get(prop)
                        : prop in target
                            ? target[prop]
                            : 'Unknown Function';
                }
            });
        }
    }
}

module.exports = FunctionsClient;