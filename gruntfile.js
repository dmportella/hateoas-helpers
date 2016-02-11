module.exports = function (grunt) {
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        env: {
            dev: {
                NODE_ENV: 'dev'
            }
        },
        mochacli: {
            src: ['tests/**/*.js'],
            options: {
                timeout: 3000,
                ignoreLeaks: false,
                ui: 'bdd',
                reporter: 'spec'
            }
        },
        eslint: {
            target: ['src/**/*.js', 'index.js', 'tests/**/*.js']
        }
    });

    grunt.registerTask('default', ['eslint', 'mochacli']);
};