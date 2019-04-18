const levenshtein = require('fast-levenshtein');
const Util = require('./Util');

class ExtendedMap extends Map {
    constructor(parent = null) {
        super();

        this.parent = parent;

        this.aliases = new Map();

        Object.defineProperties(this, {
            keyArray: {
                enumerable: false,
                value: [],
                writable: true
            },
            aliasKeyArray: {
                enumerable: false,
                value: [],
                writable: true
            }
        });
    }

    get(item) {
        const foundAlias = this.aliases.get(item);
        if (foundAlias) return foundAlias;
        for (const alias of this.aliasKeyArray) {
            if (levenshtein.get(alias, item) <= 3) return this.aliases.get(alias);
        }
        for (const key of this.keyArray) {
            if (key.test(item)) return this.get(key);
        }
        return undefined;
    }

    add(item, value) {
        this.set(new RegExp(`\\b(?:${Util.generateRegex(item)})\\b`, 'i'), value);
        this.aliases.set(item, value);
        if (this.parent instanceof ExtendedMap) this.parent.aliases.set(item, value);
    }
}

module.exports = ExtendedMap;