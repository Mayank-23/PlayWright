const {test, expect} = require('@playwright/test')


test('dialog handling, hovering and frames learning', async({page})=>{

    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    await expect(page.locator('#displayed-text')).toBeVisible();
    await page.locator('#hide-textbox').click();
    await expect(page.locator('#displayed-text')).toBeHidden();
    await page.getByPlaceholder('Enter Your Name').fill('Jimmy');
    page.on('dialog', dialog => dialog.accept()); //used to handle the dialog or popups on the screen dialog.reject can be given for negative response to popup
    await page.locator('#confirmbtn').click();
    await page.locator('#mousehover').hover();
    const framesPage = await page.frameLocator('#courses-iframe');
    await framesPage.locator("li a[href='lifetime-access']:visible").click();
    console.log(await framesPage.locator('.text h2 span').textContent());
    const subscriber = await framesPage.locator('.text h2 span');
    await expect(subscriber).toBeVisible();
    
})