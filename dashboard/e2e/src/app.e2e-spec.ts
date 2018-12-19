import { browser, by, element } from 'protractor';

describe('workspace-project App', () => {

    it('登入成功', () => {
        browser.get('/').then(() => {
            const accountInput = element(by.css('input[name="account"]'));
            const passwordInput = element(by.css('input[name="password"]'));
            const submitBtn = element(by.css('.btn-block'));
            accountInput.sendKeys('admin');
            passwordInput.sendKeys('123456789');
            submitBtn.click();
            expect(browser.getCurrentUrl()).toBe('http://localhost:4200/login');
        });
    });
});
