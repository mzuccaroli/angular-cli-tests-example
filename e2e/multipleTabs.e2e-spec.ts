import {AppPage} from './app.po';
import {browser, by, element} from 'protractor';

describe('angular-cli-tests-example App', () => {
    let page: AppPage;

    beforeAll(() => {
        page = new AppPage();
        page.closeOpenedTabs();
    });

    afterEach(() => {
        page.closeOpenedTabs();
    });

    it('should open a new tab with app homepage after clicking on "newtab" link', () => {
        page.navigateTo();
        page.getNewTabLink().click();

        browser.getAllWindowHandles().then(function (handles) {
            expect(handles.length).toEqual(2);
            browser.switchTo().window(handles[1]).then(function () {
                expect(page.getParagraphText()).toEqual('Welcome to app!');
            });
        });
    });
});
