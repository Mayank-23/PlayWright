import {test, expect} from '@playwright/test'

test('Playwright Specific Locators', async ({page}) =>{

    await page.goto("https://rahulshettyacademy.com/angularpractice/");
    await page.getByLabel("Check me out if you Love IceCreams!").click();
    await page.getByLabel("Employed").click(); //.check() can also be used it specfically clicks the radio button or checkboxes
    await page.getByLabel("Gender").selectOption("Female");
   // await page.pause();
   await page.getByPlaceholder("Password").fill('Password@123');
   await page.getByRole("button", {name: 'Submit'}).click();
   const visible = await page.getByText("Success! The Form has been submitted successfully!.").isVisible();
   await expect(visible).toBeTruthy();
   await page.getByRole("link", {name: 'Shop'}).click();
   await page.locator("app-card").filter({hasText: 'Nokia Edge'}).getByRole("button").click() //only one button on that particular element so no need to give second argument
   

})