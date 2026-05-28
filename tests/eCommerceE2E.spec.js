const {test,expect} = require("@playwright/test");


test('E2E Journey of eCommerce', async ({browser})=>{
    const context = await browser.newContext();
    const page = await context.newPage();
    const userEmail = page.locator('#userEmail');
    const password = page.locator('#userPassword');
    const signIn = page.locator("[type = 'submit']");
    const cardTitles = page.locator(".card-body h5");
    const products = page.locator(".card-body");
    const productName = 'ZARA COAT 3';
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    await userEmail.fill("assignment@user.com");
    await password.fill("Learning@830$3mK2");
    await signIn.click();
    //console.log(await cardTitles.last().textContent());
    await page.waitForLoadState('networkidle'); //this alone isn't enough to make the page wait for loading the all the product cards
    await products.first().waitFor(); // goven so that the playwright waits for the first card to load
  
    //console.log(await page.locator(".card-body h5").allTextContents());
   // await expect(await cardTitles.first()).toContainText('ADIDAS ORIGINAL');
   const count = await products.count();
   for(let i=0;i<count;i++){
    //await console.log("Inside for")
    if(await products.nth(i).locator("b").textContent() === productName){

        await products.nth(i).locator("text = Add To Cart").click();
        //await console.log("Inside If")
        break;
    }
    

   }
   
   await page.locator("[routerlink = '/dashboard/cart']").click(); //this can also be written as regular expression -  [routerlink*= 'cart']
   await page.locator("div li").first().waitFor();
   const bool = await page.locator("h3:has-text('ZARA COAT 3')").isVisible();
   expect(bool).toBeTruthy();
   await page.pause();

})