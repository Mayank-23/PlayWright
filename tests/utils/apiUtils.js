class APIUtils{

    constructor(apiContext, loginPayLoad){
        this.apiContext = apiContext;
        this.loginPayLoad = loginPayLoad;
    }

    async getToken(){

        
        const loginResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login", {
                
                data:this.loginPayLoad
        
            })
        const loginResponseJson = await loginResponse.json(); //.json is a method which will fetch the response of the API after the call is made
        token = loginResponseJson.token; // here with .token we are fetching the token from the response body
        //console.log(token);
        return token;
    }

    async createOrder(orderPayload){
        const orderResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order", {
                
                data:orderPayload,
                headers: {
                    'Authorization' : this.getToken(), // Token is given so that order is placed for the particular user because the token holds the details of the logged in user
                    'Content-Type' : 'application/json' //
                },
            })
            const orderResponseJSON = await orderResponse.json();
            orderID = orderResponseJSON.orders[0]; //Our order ID is at 0 index
            return orderID;
    }

}
module.exports = {APIUtils}