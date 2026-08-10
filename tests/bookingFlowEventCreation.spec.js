const {test, expect} = require('@playwright/test');
const BASE_URL = "https://eventhub.rahulshettyacademy.com/";

//Reusable navigation function below
async function navigate(page) {
    await page.goto(BASE_URL);
}

async function login(page, email = "assignment@user.com", password = "Learning@830$3mK2") {
    
    await navigate(page);
    await page.getByPlaceholder("you@email.com").fill(email);
    await page.getByLabel("Password").fill(password);
    await page.locator("#login-btn").click();
}

//Step 1
test('Login to application', async({browser})=>{
    const context = await browser.newContext();
    const page = await context.newPage();
    await login(page);
    await expect(page.getByText("Browse Events →")).toBeVisible();
    await page.pause();


})