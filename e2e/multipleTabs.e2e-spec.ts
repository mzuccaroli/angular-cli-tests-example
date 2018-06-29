import {AppPage} from './app.po';

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

        page.getOpenedTabs().then(function (tabs) {
            expect(tabs.length).toEqual(2);
            page.goToTab(tabs[1]).then(function () {
                expect(page.getParagraphText()).toEqual('Welcome to app!');
            });
        });
    });
});
