const {test,expect} = require("@playwright/test");


test('Login and Get Title of the first element', async ({browser})=>{
    const context = await browser.newContext();
    const page = await context.newPage();
    const userEmail = page.locator('#userEmail');
    const password = page.locator('#userPassword');
    const signIn = page.locator("[type = 'submit']");
    const cardTitles = page.locator(".card-body h5");
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    await userEmail.fill("assignment@user.com");
    await password.fill("Learning@830$3mK2");
    await signIn.click();
    //console.log(await cardTitles.last().textContent());
    await page.waitForLoadState('networkidle');
    console.log(await page.locator(".card-body h5").allTextContents());
    await expect(await cardTitles.first()).toContainText('ADIDAS ORIGINAL');
    await expect(await cardTitles.last()).toContainText('iphone 13 pro');

})