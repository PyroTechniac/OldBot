const { REPLACERE } = require('./Constants');

const primitives = [
    'Array',
    'string',
    'boolean',
    'number',
    'Function',
    'null',
    'undefined'
];

const escapes = ['<', '>'];

class Util {
    constructor() {
        throw new Error(`${this.constructor.name} cannot be instantiated with new`);
    }

    static generateRegex(string) {
        return string.replace(REPLACERE, (letter, nextWord) => `${letter}+${nextWord ? '\\W*' : ''}`);
    }

    static formatString(string, documentation) {
        // TODO: Find all @link / @tutorial and parse them
        return string;
    }

    static parseExternals(externals, documentation) {
        // Fetch externals, return array of externals
        return externals;
    }

    static formatTypes(types, documentation) {
        const returnString = [];
        types = Util.flattenArray(types);
        let temp = '';
        for (const type of types) {
            if (type.length > 1) {
                for (const string of type) {
                    temp += Util.wrapURL(string, documentation);
                }
                continue;
            }
            returnString.push(type[0]);
        }
        if (temp.length) returnString.push(temp);
        return returnString.join(' | ');
    }

    static flattenArray(array) {
        return array.reduce((acc, val) => acc.concat(val), []);
    }

    static wrapURL(string, documentation) {
        if (primitives.includes(string)) return `[**${string}**](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/${string})`;
        if (escapes.includes(string)) return `\\${string}`;
        const item = documentation.get(string);
        if (item) return `[**${string}**](${item.url})`;
        return string;
    }
}

module.exports = Util;