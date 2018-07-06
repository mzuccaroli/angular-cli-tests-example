import {TestUtils} from './testUtils';
import {AppPage} from './app.po';

const testUtils = new TestUtils();

describe('angular-cli-tests-example App', () => {
    let page: AppPage;

    beforeEach(() => {
        page = new AppPage();
    });

    afterEach(testUtils.takeFailScreens);

    it('should display welcome message', () => {
        page.navigateTo();
        expect(page.getParagraphText()).toEqual('Welcome to app!');
    });
});
