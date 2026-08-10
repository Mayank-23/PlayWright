import {test, expect} from '@playwright/test'

test('Playwright Specific Locators', async ({page}) =>{

    await page.goto("https://rahulshettyacademy.com/angularpractice/");
    await page.getByLabel("Check me out if you Love IceCreams!").click();
    await page.getByLabel("Employed").click(); //.check() can also be used it specfically clicks the radio button or checkboxes
    await page.getByLabel("Gender").selectOption("Female");
   // await page.pause();
   await page.getByPlaceholder("Password").fill('Password@123');
   await page.getByRole("button", {name: 'Submit'}).click();
   //assertion is applied seperately on the variable as the result was stored in it
   const visible = await page.getByText("Success! The Form has been submitted successfully!.").isVisible();
   await expect(visible).toBeTruthy();
   //assertion can be directly applied on the get by text as it is checking the text.
   //default timeout when locator is directly wrapped for assertion is 5 secs can be increased by giving .toBeVisible({timeout: 10_000}) - step level
   await expect(page.getByText("Success! The Form has been submitted successfully!.")).toBeVisible();
   
   await page.getByRole("link", {name: 'Shop'}).click();
   await page.locator("app-card").filter({hasText: 'Nokia Edge'}).getByRole("button").click() //only one button on that particular element so no need to give second argument
   

}),

test('test specific timeout', async ({page}) =>{

    //whole test specific timeout in config file the default time for finishing each test in 30 secs here we have increased for this specific test to 60 secs
    //test.timeout(60000);
    //this can be used when a specific flow is taking more time then the default timeout where ever more time is required we can give slowExpect instead of expect
    const slowExpect = expect.configure({timeout:9000});
    //test level action timeout
    page.setDefaultTimeout(9000);
    await page.goto("https://rahulshettyacademy.com/angularpractice/");
    await page.getByLabel("Check me out if you Love IceCreams!").click();
    await page.getByLabel("Employed").click(); //.check() can also be used it specfically clicks the radio button or checkboxes
    await page.getByLabel("Gender").selectOption("Female");
   // await page.pause();
   await page.getByPlaceholder("Password").fill('Password@123');
   await page.getByRole("button", {name: 'Submit'}).click();
   //assertion is applied seperately on the variable as the result was stored in it
   const visible = await page.getByText("Success! The Form has been submitted successfully!.").isVisible();
   await expect(visible).toBeTruthy();
   //assertion can be directly applied on the get by text as it is checking the text.
   //default timeout when locator is directly wrapped for assertion is 5 secs can be increased by giving .toBeVisible({timeout: 10_000})
   await expect(page.getByText("Success! The Form has been submitted successfully!.")).toBeVisible();
   
   await page.getByRole("link", {name: 'Shop'}).click();
   //slowExpect used below
   await slowExpect(page.locator(".my-4").first()).toContainText("Shop");
   await page.locator("app-card").filter({hasText: 'Nokia Edge'}).getByRole("button").click() //only one button on that particular element so no need to give second argument
   

})