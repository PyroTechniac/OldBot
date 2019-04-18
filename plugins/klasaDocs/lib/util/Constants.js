exports.Urls = {
    GH_API: 'https://api.github.com',
    RAW_URL: 'https://raw.githubusercontent.com'
};

exports.REPLACERE = /\w(?=(\w)?)/g;

exports.DEFAULTS = {
    repository: 'dirigeants/klasa',
    jsonBranch: 'docs',
    branches: [
        'master',
        'stable'
    ]
};