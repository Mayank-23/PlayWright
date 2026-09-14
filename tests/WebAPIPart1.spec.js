const {test, expect, request} = require('@playwright/test')
const loginPayLoad = {userEmail: "assignment@user.com", userPassword: "Learning@830$3mK2"} // Login payload given as a global constant object here which can be used for any of the test
let token;
const orderPayload = {"orders":[{"country":"Cuba","productOrderedId":"6960eac0c941646b7a8b3e68"}]} // Create order payload which has the item which needs to be placed in order
let orderID;

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

    const orderResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order", {
        
        data:orderPayload,
        headers: {
            'Authorization' : token, // Token is given so that order is placed for the particular user because the token holds the details of the logged in user
            'Content-Type' : 'application/json' //
        },
    })
    const orderResponseJSON = await orderResponse.json();
    orderID = orderResponseJSON.orders[0]; //Our order ID is at 0 index

});

test('E2E Journey of eCommerce', async ({browser})=>{
    const email = "assignment@user.com";
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.addInitScript(value => {   
        window.localStorage.setItem('token',value)  //used for injecting token into browser local storage
    }, token);
    const productName = 'ZARA COAT 3';
    await page.goto("https://rahulshettyacademy.com/client/");
    await products.first().waitFor();
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