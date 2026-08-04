const {test,expect} = require("@playwright/test");


test('E2E Journey of eCommerce', async ({browser})=>{
    const email = "assignment@user.com";
    const context = await browser.newContext();
    const page = await context.newPage();
    const userEmail = page.locator('#userEmail');
    const password = page.locator('#userPassword');
    const signIn = page.locator("[type = 'submit']");
    const cardTitles = page.locator(".card-body h5");
    const products = page.locator(".card-body");
    const productName = 'ZARA COAT 3';
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    await userEmail.fill(email);
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
   
   await page.locator("text = Checkout").click();
   await expect(await page.locator(".item__title")).toContainText(productName);
   await page.locator("[class*='input txt text-validated']").first().fill("9125603620")
  // await page.locator("select").selectOption("05");
   await page.locator("[class = 'input txt']").first().fill("999");
   await page.locator("[class = 'input txt']").last().fill("Shaun Parker");
   await page.locator("[name= 'coupon']").fill("rahulshettyacademy");
   await page.locator("[type= 'submit']").click();
   const couponApplied = await page.locator("p:has-text('* Coupon Applied')");
   await expect(couponApplied).toContainText('* Coupon Applied');
   await page.locator("[placeholder= 'Select Country']").pressSequentially("ind");
   const dropDown = await page.locator(".ta-results");
   await dropDown.waitFor();
   const optionsCount = await dropDown.locator("button").count();
   for(let i=0;i<optionsCount;i++){
    let text = await dropDown.locator("button").nth(i).textContent();
    if(text.trim() === "India"){
        await dropDown.locator("button").nth(i).click();
        break;
    }

   }
   await expect(page.locator(".user__name [type = 'text']").first()).toHaveText(email);
   await page.locator("[class*='action__submit']").click();
   const confirm = page.locator(".hero-primary");
   await expect(confirm).toBeVisible();
   let orderID = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
   orderID = orderID.replaceAll('|','').trim();
   console.log(orderID);
   await page.locator("ul [routerlink*='myorders']").click();
   const items = await page.locator(".py-5 [scope = 'row']");
   const buttons = await page.locator(".py-5 td .btn-primary");
   await items.first().waitFor();
   const itemCount = await items.count();
   for(let i=0;i<itemCount;i++){
    let orderID_match = (await items.nth(i).textContent())?.trim();
    if(orderID_match===orderID){
        await buttons.nth(i).click();
        break;
    }
   }
   await page.pause();




})