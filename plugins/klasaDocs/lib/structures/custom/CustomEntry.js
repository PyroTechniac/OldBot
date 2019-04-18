const { lexer } = require('marked');
const BaseEntry = require('../base/BaseEntry');
const Util = require('../../util/Util');

class CustomEntry extends BaseEntry {
    _patch(string) {
        super._patch(string);
        const tokens = lexer(string);
        const headings = [];
        tokens.forEach(item => {
            if (item.type === 'heading') headings.push(item.text);
        });

        this.pages.push({
            content: [
                `The following guide (which you can read [here](${this._generateURL(this.name)})) has the following headings:`,
                '',
                ...headings.map(heading => Util.formatString(heading, this.documentation)).map(heading => `• **${heading}**`)
            ].join('\n')
        });
    }
}

module.exports = CustomEntry;