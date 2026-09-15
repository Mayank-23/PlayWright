const {test, expect, request} = require('@playwright/test');
const { apiUtils } = require('./utils/apiUtils');
require('./utils/apiUtils');
const loginPayLoad = {userEmail: "assignment@user.com", userPassword: "Learning@830$3mK2"} // Login payload given as a global constant object here which can be used for any of the test
const orderPayload = {"orders":[{"country":"Cuba","productOrderedId":"6960eac0c941646b7a8b3e68"}]} // Create order payload which has the item which needs to be placed in order
let response;

test.beforeAll( async()=>{
  
    const apiContext = await request.newContext();  //here apiContent will work as page which we are using for UI test like page.locator and other things
    const api = new apiUtils(apiContext, loginPayLoad);
    response = await api.createOrder(orderPayload);  
});

test('Place the order using API', async ({page})=>{

    await page.addInitScript(value => {   
        window.localStorage.setItem('token',value)  //used for injecting token into browser local storage
    }, response.token);
    await page.goto("https://rahulshettyacademy.com/client/");
   //console.log(orderID);
   await page.locator("ul [routerlink*='myorders']").click();
   const items = await page.locator(".py-5 [scope = 'row']");
   const buttons = await page.locator(".py-5 td .btn-primary");
   await items.first().waitFor();
   const itemCount = await items.count();
   for(let i=0;i<itemCount;i++){
    let orderID_match = (await items.nth(i).textContent());
    if(orderID_match===response.orderID){
        await buttons.nth(i).click();
        break;
    }
   }
   const orderIDdetails = await page.locator(".col-text").textContent();
   expect(response.orderID.includes(orderIDdetails)).toBeTruthy();

})