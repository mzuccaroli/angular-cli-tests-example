import {TestUtils} from './testUtils';
import {AppPage} from './app.po';

const testUtils = new TestUtils();

describe('angular-cli-tests-example App', () => {
    let page: AppPage;

    beforeAll(() => {
        page = new AppPage();
        testUtils.closeOpenedTabs();
    });

    afterEach(() => {
        testUtils.closeOpenedTabs();
    });

    it('should open a new tab with app homepage after clicking on "newtab" link', () => {
        page.navigateTo();
        page.getNewTabLink().click();

        testUtils.getOpenedTabs().then(function (tabs) {
            expect(tabs.length).toEqual(2);
            testUtils.goToTab(tabs[1]).then(function () {
                expect(page.getParagraphText()).toEqual('Welcome to app!');
            });
        });
    });
});
