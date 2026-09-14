const {test, expect, request} = require('@playwright/test')
const loginPayLoad = {userEmail: "assignment@user.com", userPassword: "Learning@830$3mK2"} // Login payload given as a global constant object here which can be used for any of the test
let token;
const orderPayload = {"orders":[{"country":"India","productOrderedId":"6960eac0c941646b7a8b3e68"}]} // Create order payload which has the item which needs to be placed in order

test.beforeAll( async()=>{
    //Login API
    const apiContext = await request.newContext();  //here apiContent will work as page which we are using for UI test like page.locator and other things
    const loginResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login", {
        
        data:loginPayLoad

    })
    expect((loginResponse).ok()).toBeTruthy();
    const loginResponseJson = await loginResponse.json(); //.json is a method which will fetch the response of the API after the call is made
    token = loginResponseJson.token; // here with .token we are fetching the token from the response body
    //console.log(token);

    const createOrder = apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order", {
        
        data:orderPayload,
        headers: {
            'Authorization' : token, // Token is given so that order is placed for the particular user because the token holds the details of the logged in user
            'Content-Type' : 'application/json' //
        },
    })

});

test('E2E Journey of eCommerce', async ({browser})=>{
    const email = "assignment@user.com";
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.addInitScript(value => {   
        window.localStorage.setItem('token',value)  //used for injecting token into browser local storage
    }, token);
    //const userEmail = page.locator('#userEmail');
    //const password = page.locator('#userPassword');
    //const signIn = page.locator("[type = 'submit']");
    const cardTitles = page.locator(".card-body h5");
    const products = page.locator(".card-body");
    const productName = 'ZARA COAT 3';
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    //await userEmail.fill(email);
    //await password.fill("Learning@830$3mK2");
    //await signIn.click();
    //await page.waitForLoadState('networkidle');
    await products.first().waitFor();
  
   const count = await products.count();
   for(let i=0;i<count;i++){
    if(await products.nth(i).locator("b").textContent() === productName){

        await products.nth(i).locator("text = Add To Cart").click();
        break;
    }
    

   }
   
   await page.locator("[routerlink = '/dashboard/cart']").click();
   await page.locator("div li").first().waitFor();
   const bool = await page.locator("h3:has-text('ZARA COAT 3')").isVisible();
   expect(bool).toBeTruthy();
   
   await page.locator("text = Checkout").click();
   await expect(await page.locator(".item__title")).toContainText(productName);
   await page.locator("[class*='input txt text-validated']").first().fill("9125603620")
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
   //console.log(orderID);
   await page.locator("ul [routerlink*='myorders']").click();
   const items = await page.locator(".py-5 [scope = 'row']");
   const buttons = await page.locator(".py-5 td .btn-primary");
   await items.first().waitFor();
   const itemCount = await items.count();
   for(let i=0;i<itemCount;i++){
    let orderID_match = (await items.nth(i).textContent());
    if(orderID_match===orderID){
        await buttons.nth(i).click();
        break;
    }
   }
   const orderIDdetails = await page.locator(".col-text").textContent();
   await expect(orderID.includes(orderIDdetails)).toBeTruthy();




})