var axios = require('axios');
var twitter = require('twitter');
var tconfig = require('./twitterbotconfig.json');
var Twitter = new twitter({
    consumer_key: tconfig.consumer_key,
    consumer_secret: tconfig.consumer_secret,
    access_token_key: tconfig.access_token_key,
    access_token_secret: tconfig.access_token_secret,
});
var statusPost = {
    url:"",
    title:"",
}
var params = {
    status:"",
    //attachment_url:"",
}
var callback = function (err, response, body) {
    console.log('Callback: ', response);
};

setInterval(ApiCall, 1200000);
function ApiCall() {
    
    var url = 'https://www.reddit.com/r/baseball/rising.json';
    
    axios.get(url).then(response => {
        getElements(response);
    }).catch(error => {
        console.log(error);
    })

    getElements = function(response) {
        params.status = response.data.data.children[0].data.title + " " + response.data.data.children[0].data.url;
        console.log(params);
        SendTweet(params);
 }   
}
function SendTweet(params) {
    Twitter.post("statuses/update", params, callback);
}

ApiCall();
