const {SpecReporter} = require('jasmine-spec-reporter');
var browserstack = require('browserstack-local');

exports.config = {
    allScriptsTimeout: 50000,
    specs: [
        './e2e/**/*.e2e-spec.ts'
    ],

    'seleniumAddress': 'http://hub-cloud.browserstack.com/wd/hub',

    commonCapabilities: {
        'browserstack.user': 'xxxx', // TODO: insert user
        'browserstack.key': 'xxxx', // TODO: insert key
        'browserstack.local': true
    },

    'multiCapabilities': [{
        'browserName': 'Chrome'
    }, {
        'browserName': 'Safari',
        'browser_version': '8'
    }, {
        'browserName': 'Firefox',
        'browser_version': '50'
    }, {
        'browserName': 'IE',
        'browser_version': '11.0'
    }],

    baseUrl: 'http://www.testpage.demo/',
    framework: 'jasmine',
    jasmineNodeOpts: {
        showColors: true,
        defaultTimeoutInterval: 50000,
        print: function () {
        }
    },
    onPrepare() {
        require('ts-node').register({
            project: 'e2e/tsconfig.e2e.json'
        });
        jasmine.getEnv().addReporter(new SpecReporter({spec: {displayStacktrace: true}}));
    },

    // Code to start browserstack local before start of test 
    beforeLaunch: function () {

        console.log("Connecting local");
        return new Promise(function (resolve, reject) {
            exports.bs_local = new browserstack.Local();
            exports.bs_local.start({'key': exports.config.capabilities['browserstack.key']}, function (error) {
                if (error) return reject(error);
                console.log('Connected. Now testing...');

                resolve();
            });
        });
    },

    // Code to stop browserstack local after end of test
    afterLaunch: function () {
        return new Promise(function (resolve, reject) {
            exports.bs_local.stop(resolve);
        });
    }
};

// Code to support common capabilities
exports.config.multiCapabilities.forEach(function (caps) {
    for (var i in exports.config.commonCapabilities) caps[i] = caps[i] || exports.config.commonCapabilities[i];
});