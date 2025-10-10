module.exports = [
    {
        name: 'functions/node-runtime',
        files: ['**/*.js'],
        languageOptions: {
            sourceType: 'commonjs',
            ecmaVersion: 2018,
            globals: {
                require: 'readonly',
                module: 'readonly',
                exports: 'readonly'
            }
        },
        rules: {}
    }
]


