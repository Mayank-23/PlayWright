const {test, expect} = require("@playwright/test");

test('Example test', async ({browser})=>{
    const context = await browser.newContext(); //fresh instance of browser will open
    const page = await context.newPage();
    await page.goto("https://example.com");
    const head = await page.locator("div h1");
    const title = await page.title();
    //console.log(title);
    await expect(page).toHaveTitle("Example Domain");
    //console.log(head);
    await expect(head).toHaveText("Example Domain");


}),

test('Example test 2', async ({page})=>{

    await page.goto("https://the-internet.herokuapp.com/login");
    const heading = await page.locator("h2");
    const userEmail = page.locator('#username');
    const password = page.locator('#password'); 
    const success = page.locator("#flash");
    await expect(heading).toHaveText("Login Page");
    await userEmail.fill("tomsmith");
    await password.fill("SuperSecretPassword!");
    await page.locator('.radius').click();
    await expect(success).toContainText("You logged into a secure area!");
  


})