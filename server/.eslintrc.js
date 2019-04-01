module.exports = {
    "env": {
        "commonjs": true,
        "es6": true,
        "node": true
    },
    "extends": ["plugin:@typescript-eslint/recommended", "eslint:recommended", "plugin:jest/recommended"],
    "parser": '@typescript-eslint/parser',
    "plugins": ['@typescript-eslint'],
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaVersion": 2018
    },
    "rules": {
        "no-undef": 2
    }
};
