const {test,expect} = require("@playwright/test");


test.only('Browser Context PlayWright test', async function({browser})
{ 
    const context = await browser.newContext(); //fresh instance of browser will open
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    await page.locator('input#username').fill("Mayank");
    await page.locator("[type='password']").fill("learning");
    await page.locator('#signInBtn').click();
    console.log(await page.locator("[style*='block']").textContent());
    await expect(await page.locator("[style*='block']")).toContainText('Incorrect');

    
})

test('Page Context Playwright Test', async ({page})=>{
    await page.goto("https://google.com");
    //console.log(await page.title());
    await expect(page).toHaveTitle("Google");
})