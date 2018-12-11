import { browser, by, element } from 'protractor';

describe('workspace-project App', () => {

    it('登入成功', () => {
        browser.get('/').then(() => {
            const accountInput = element(by.css('input[name="account"]'));
            const passwordInput = element(by.css('input[name="password"]'));
            const submitBtn = element(by.css('.btn-block'));
            accountInput.sendKeys('admin');
            passwordInput.sendKeys('123456789');
            console.log(submitBtn);
            submitBtn.click();
            // 等待5秒关闭
            browser.wait(() => { }, 5000);
        });
    });
});
