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


})  