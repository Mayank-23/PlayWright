const {test, expect} = require('@playwright/test')


test('Popup Validations', async({page})=>{

    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    //await page.goto("https://www.google.com/");
    //await page.goBack();
    //await page.goForward();
    await expect(page.locator('#displayed-text')).toBeVisible();
    await page.locator('#hide-textbox').click();
    await expect(page.locator('#displayed-text')).toBeHidden();
    await page.getByPlaceholder('Enter Your Name').fill('Jimmy');
    await page.pause();
    page.on('dialog', dialog => dialog.accept()); //used to handle the dialog or popups on the screen dialog.reject can be given for negative response to popup
    await page.locator('#confirmbtn').click();
    await page.locator('#mousehover').hover();
    
})