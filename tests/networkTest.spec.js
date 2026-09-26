const {test, expect, request} = require('@playwright/test');
const { apiUtils } = require('./utils/apiUtils');
const loginPayLoad = {userEmail: "assignment2@user.com", userPassword: "Learning@830$3mK2"}; // Login payload given as a global constant object here which can be used for any of the test
const orderPayload = {orders:[{country:"Cuba",productOrderedId:"6960eac0c941646b7a8b3e68"}]}; // Create order payload which has the item which needs to be placed in order
const fakePayloadOrders = {data:[],message:"No Orders"}; // This a javascript object but need to be sent as JSON object
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
   await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*", //by putting * in last we have make it general for any user otherwise it will pick for the particular user for whcih ID is gvien
    async route=>{
        //intercepting response here - Life cycle of routing shown below
        //API response -> {playwright inject fake response} -> sent to browser for particular session
        const response = await page.request.fetch(route.request());
        let body = JSON.stringify(fakePayloadOrders); //By giving JSON.stringify we are converting the Javascript object to JSON format
        route.fulfill({
            response,
            body
        });
    });
    await page.locator("ul [routerlink*='myorders']").click();
    await page.waitForResponse("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*")
   await expect(page.locator(".mt-4")).toContainText(" You have No Orders to show at this time.");
   
})