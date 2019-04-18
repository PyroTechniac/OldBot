const CustomEntry = require('./CustomEntry');
const ExtendedMap = require('../../util/ExtendedMap');

class CustomDocument extends ExtendedMap {
    constructor(documentation, data, createdAt, parent) {
        super();
        this.documentation = documentation;
        this.createdAt = createdAt;

        this.parent = parent;

        this._patch(data);
    }

    _patch(data) {
        for (const [key, value] of Object.entries(data)) {
            const entry = new CustomEntry(this.documentation, value.content, this.createdAt, key, this.parent, value.name);
            this.add(key, entry);
            this.add(value.name, entry);
        }
        this.keyArray = [...this.keys()];
        this.aliasKeyArray = [...this.aliases.keys()];
    }

    get default() {
        return this.get(this.aliasKeyArray[0]);
    }

    get branch() {
        return this.documentation.branch;
    }
}

module.exports = CustomDocument;