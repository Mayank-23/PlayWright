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

async function futureDatevalue() {
    const future = new Date();
    future.setDate(future.getDate()+7);
    return future.toISOString().slice(0, 16);
    
}

//Step 1
test('Login to application', async({browser})=>{
    const context = await browser.newContext();
    const page = await context.newPage();
    await login(page);
    await expect(page.getByText("Browse Events →")).toBeVisible();
    //await page.pause();
    
    //Step 2
    await page.getByRole('button',{name:'Admin'}).click();
    await page.locator("[ href = '/admin/events' ]").first().click();
    const event = `Test Event ${Date.now()}`;  //Javascript function to get the timestamp in miliseconds and appending it with Test event to create event name
    //console.log(event);
    await page.locator('#event-title-input').fill(event);
    await page.getByPlaceholder('Describe the event…').fill("Test text entered into the event description");
    //Start after Description
    await page.getByLabel('city').fill("Bangalore");
    await page.getByLabel('Venue').fill("MG Road");
    await page.getByLabel('Event Date & Time').fill(await futureDatevalue());
    await page.getByLabel('Price ($)').fill("1000");
    await page.getByLabel('Total Seats').fill("50");
    await page.locator('#add-event-btn').click();
    await expect(page.getByText('✓Event created!×')).toBeVisible();
    
    await page.locator('#nav-events').click();
    
    await page.locator('[data-testid="event-card"]').first().isVisible();
    const eventCards = page.locator('[data-testid="event-card"]');
    const match = eventCards.filter({hasText: event});
    await expect(match).toBeVisible();
    //await page.pause();
    //need to start from last step before step 4

    




})