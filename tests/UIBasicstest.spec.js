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
}),

test('UI Controls', async({page})=>{
    const userName = page.locator('input#username');
    const password = page.locator("[type='password']");
    const dropDown = page.locator('select.form-control');
    const radio = page.locator('.radiotextsty');
    const docsLink = page.locator("[href='https://rahulshettyacademy.com/documents-request']");
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    await userName.fill("Mayank");
    await password.fill("learning");
    await dropDown.selectOption("consult");
    //await page.pause();
    await radio.nth(1).click();
    //await page.pause();
    await page.locator('#okayBtn').click();
    await expect(radio.nth(1)).toBeChecked(); // one way of adding this assertion
    console.log(await radio.nth(1).isChecked());// not an assertion but will check and return true or false if the radio button is checked or unchecked.
    //await page.pause();
    await page.locator("#terms").click();
    await expect(page.locator("#terms")).toBeChecked();
    await page.locator("#terms").uncheck();// will uncheck the selected checkbox.
    expect(await page.locator("#terms").isChecked()).toBeFalsy(); //will return true if the checkbox is unchecked
    //await page.pause();
    await expect(docsMatch).toHaveAttribute("class", "blinkingText");
}),

test.only('Child window handling', async ({browser})=>{
    const context = await browser.newContext();
    const page = await context.newPage();
    const userName = page.locator('input#username');
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const docsLink = page.locator("[href='https://rahulshettyacademy.com/documents-request']");
   const [newPage] = await Promise.all([

    context.waitForEvent('page'), //catching the second page has to be given before the new page is getting opened
    docsLink.click(),
])

 const text = await newPage.locator("[class = 'im-para red']").textContent();
 const arrayText = text.split("@");
 const domain = arrayText[1].split(" ")[0];
 //console.log(domain);
 await userName.fill(domain);
 await page.pause();
 console.log(await userName.inputValue());
 await expect(userName).toHaveValue(domain);
await page.pause();
    


})