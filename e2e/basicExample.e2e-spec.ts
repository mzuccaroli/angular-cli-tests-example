import {browser, by, element} from 'protractor';

describe('angular-cli-tests-example App', () => {

    it('should display welcome message', () => {
        browser.get('/');
        expect(element(by.css('app-root h1')).getText()).toEqual('Welcome to app!');
    });

});
