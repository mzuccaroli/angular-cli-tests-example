import {browser} from 'protractor';

const fs = require('fs');

export class TestUtils {

    closeOpenedTabs() {
        browser.getAllWindowHandles().then(function (handles) {
            for (let i = 1; i < handles.length; i++) {
                if (handles[i]) {
                    console.log('** testutils - closing tab: ' + i + ' **');
                    browser.driver.switchTo().window(handles[i]);
                    browser.driver.close();
                }
            }
            browser.driver.switchTo().window(handles[0]);
        });
    }

    getOpenedTabs() {
        return browser.getAllWindowHandles();
    }

    goToTab(tab) {
        return browser.switchTo().window(tab);
    }

    public takeFailScreens() {

        browser.takeScreenshot().then(function (png) {
            jasmine.getEnv().addReporter(new function () {
                this.specDone = function (result) {
                    let filename = Date.now() + result.fullName.replace(/ /g, '_') + '.png';
                    if (result.failedExpectations.length > 0) {
                        filename = 'FAIL_' + filename;
                        const screenShotDirectory = 'e2e/testresults/';
                        const stream = fs.createWriteStream(screenShotDirectory + filename);

                        stream.write(new Buffer(png, 'base64'));
                        stream.end();
                    } else {
                        // SUCCESS TEST
                    }
                };
            });

        });
    };
}