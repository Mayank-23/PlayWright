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

 function futureDatevalue() {
    const future = new Date();
    future.setDate(future.getDate()+7);
    return future.toISOString().slice(0, 16);
    
}

//Step 1
test('End to End Event Booking', async({page})=>{
    //not used the browser context, directly went with page context
    await login(page);
    await expect(page.getByText("Browse Events →")).toBeVisible();
    
    //Step 2
    await page.getByRole('button',{name:'Admin'}).click();
    await page.locator("[ href = '/admin/events' ]").first().click();
    const event = `Test Event ${Date.now()}`;
    await page.locator('#event-title-input').fill(event);
    await page.getByPlaceholder('Describe the event…').fill("Test text entered into the event description");
    //Start after Description
    await page.getByLabel('city').fill("Bangalore");
    await page.getByLabel('Venue').fill("MG Road");
    await page.getByLabel('Event Date & Time').fill(await futureDatevalue());
    await page.getByLabel('Price ($)').fill("1000");
    await page.getByLabel('Total Seats').fill("50");
    await page.locator('#add-event-btn').click();
    await expect(page.getByText('Event created!')).toBeVisible();
    await page.locator('#nav-events').click();
    await expect(page.locator('[data-testid="event-card"]').first()).toBeVisible();
    const eventCards = page.locator('[data-testid="event-card"]');
    const match = eventCards.filter({hasText: event});
    await expect(match).toBeVisible();
    //need to start from last step before step 4
    const seatsText = await match.locator("[class='text-xs font-semibold text-emerald-600']").textContent();
    const seatsBeforeBooking =parseInt(seatsText.match(/\d+/)[0],10);

    // Step 4
    const bookBtn = match.locator('[data-testid="book-now-btn"]');
    await bookBtn.click();
    //Step 5
    await expect(page.locator('#ticket-count:has-text("1")')).toBeVisible();
    await page.getByLabel('Full Name').fill('Test User');
    await page.locator('#customer-email').fill('testUser@test.com');
    await page.getByPlaceholder('+91 98765 43210').fill('9192931918');
    await page.locator('.confirm-booking-btn').click();
    const bookRef = await page.locator('.booking-ref').innerText();
    await page.getByRole('button', {name: 'View My Bookings'}).click();
    expect(page).toHaveURL(`${BASE_URL}bookings`);
    const bookingCards = page.locator('#booking-card');
    await expect((bookingCards).first()).toBeVisible();
    const myBooking = bookingCards.filter({hasText: bookRef});
    await expect(myBooking).toBeVisible();
    await expect(myBooking).toContainText(event);

    //Step 8
    await page.locator('#nav-events').click();
    await page.waitForTimeout(1000);
    await expect(eventCards.first()).toBeVisible();
    const myCard = eventCards.filter({hasText: event});
    await expect(myCard).toBeVisible();
    const seatsText1 = await myCard.locator("[class='text-xs font-semibold text-emerald-600']").textContent();
    console.log(seatsText1)
    const seatsAfterBooking = parseInt(seatsText1.match(/\d+/)[0],10);
    console.log("Before = ", seatsBeforeBooking);
    console.log("After = ", seatsAfterBooking);
    expect(seatsAfterBooking).toBe(seatsBeforeBooking-1);

})