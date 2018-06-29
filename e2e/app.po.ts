import {browser, by, element} from 'protractor';

export class AppPage {
    navigateTo() {
        return browser.get('/');
    }

    getParagraphText() {
        return element(by.css('app-root h1')).getText();
    }

    getNewTabLink() {
        return element(by.css('a.newtab'));
    }

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

}
