const {test,expect} = require("@playwright/test");
let webContext;

test.beforeAll(async({browser})=>{

    const context = await browser.newContext();
    const page = await context.newPage();
    const userEmail = page.locator('#userEmail');
    const password = page.locator('#userPassword');
    const signIn = page.locator("[type = 'submit']");
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    await userEmail.fill("assignment@user.com");
    await password.fill("Learning@830$3mK2");
    await signIn.click();
    await page.waitForLoadState('networkidle');
    await context.storageState({path: 'state.json'});
    webContext = await browser.newContext({storageState:'state.json'}); //Storing the login data in a new file called state.json

})


test('Login and Get Title of the first element', async ()=>{
    
    const page1 = await webContext.newPage(); // webContext variable is used here as it has the user details and token so that the user doesn't have to login again
    await page1.goto("https://rahulshettyacademy.com/client");
    const cardTitles = page1.locator(".card-body h5");
    console.log(await page1.locator(".card-body h5").allTextContents());
    await expect(await cardTitles.first()).toContainText('ADIDAS ORIGINAL');
    await expect(await cardTitles.last()).toContainText('iphone 13 pro');

})