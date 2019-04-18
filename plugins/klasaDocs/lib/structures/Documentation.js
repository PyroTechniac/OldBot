const { Urls: { GH_API, RAW_URL } } = require('../util/Constants');
const fetch = require('node-fetch');
const BranchDocument = require('./BranchDocument');
const ExtendedMap = require('../util/ExtendedMap');
const json = res => res.json();
// eslint-disable-next-line no-empty-function
const noop = () => null;

class Documentation extends ExtendedMap {
    constructor(client, repository, jsonBranch, branches) {
        super();
        this.client = client;
        this.repository = repository;
        this.jsonBranch = jsonBranch;
        this.branches = branches;
    }

    async init() {
        const branchInfo = await fetch(`${GH_API}/repos/${this.repository}/branches/${this.jsonBranch}`).then(json).catch(noop);
        if (branchInfo) {
            const branches = (await Promise.all(
                this.branches.map(branch =>
                    fetch(`${RAW_URL}/${this.repository}/${this.jsonBranch}/${branch}.json`)
                        .then(async res => {
                            const jso = await res.json();
                            return Object.assign(jso, { branch });
                        })
                        .catch(() => null))));
            for (const item of branches) {
                if (!item) continue;
                const doc = new BranchDocument(this, item);
                this.add(item.branch, doc);
            }
            this.keyArray = [...this.keys()];
            this.aliasKeyArray = [...this.aliases.keys()];
            this.client.emit('log', `Successfully loaded ${this.size === 1 ? 'a' : this.size} documentation${this.size !== 1 ? 's' : ''}`);
        } else {
            this.client.emit('error', `Couldn't find JSON Branch ${this.jsonBranch} for repository ${this.repository}`);
        }
    }
}

module.exports = Documentation;