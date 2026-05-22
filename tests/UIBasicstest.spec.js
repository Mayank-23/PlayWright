const {test,expect} = require("@playwright/test");


test('Browser Context PlayWright test', async function({browser})
{ 
    const context = await browser.newContext(); //fresh instance of browser will open
    const page = await context.newPage();
    const userName = page.locator('input#username');
    const password = page.locator("[type='password']");
    const cardTitles = page.locator(".card-body .card-title a");
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    await userName.fill("Mayank");
    await password.fill("learning");
    await page.locator('#signInBtn').click();
    console.log(await page.locator("[style*='block']").textContent());
    await expect(await page.locator("[style*='block']")).toContainText('Incorrect');
    await userName.fill("");
    await userName.fill("rahulshettyacademy");
    await password.fill("");
    await password.fill("Learning@830$3mK2");
    await page.locator('#signInBtn').click();
  //  console.log(await page.locator(".card-body .card-title a").textContent()); //Playwright will give failure as there are 4 elements present with the written css
     console.log(await cardTitles.first().textContent());
     console.log(await cardTitles.nth(1).textContent());
     const allTitles = await cardTitles.allTextContents();
     console.log(allTitles);
}),
    


test('Page Context Playwright Test', async ({page})=>{
    await page.goto("https://google.com");
    //console.log(await page.title());
    await expect(page).toHaveTitle("Google");
})