class apiUtils{

    constructor(apiContext, loginPayLoad){
        this.apiContext = apiContext;
        this.loginPayLoad = loginPayLoad;
    }

    async getToken(){

        
        const loginResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login", {
                
                data:this.loginPayLoad
        
            })
        const loginResponseJson = await loginResponse.json(); //.json is a method which will fetch the response of the API after the call is made
        const token = loginResponseJson.token; // here with .token we are fetching the token from the response body
        //console.log(token);
        return token;
    }

    async createOrder(orderPayload){
        let response = {};
        response.token = await this.getToken();
        const orderResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order", {
                
                data:orderPayload,
                headers: {
                    'Authorization' : response.token, // Token is given so that order is placed for the particular user because the token holds the details of the logged in user
                    'Content-Type' : 'application/json' //
                },
            })
            const orderResponseJSON = await orderResponse.json();
            const orderID = orderResponseJSON.orders[0]; //Our order ID is at 0 index
            response.orderID = orderID;
            return response;
    }

}
module.exports = {apiUtils}