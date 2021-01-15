function oAuth(){
    console.log("In oAuth()");
    // fetch('https://github.com/login/oauth/authorize?client_id=9e81e0b5b9e1a677e973&redirect_uri=http://127.0.0.1:5500/GithubIntegration/app.html&state=actionspace',{
    //     method:'GET',
    //     headers:{
    //         'Accept':'application/json',
    //         'Access-Control-Allow-Origin':'http://127.0.0.1:5500',
    //         'Access-Control-Allow-Credentials' : true,
    //         'Access-Control-Allow-Methods' : 'GET, POST, OPTIONS',
    //         'Access-Control-Allow-Headers' : 'Origin, Content-Type, Accept'
    //     }
    // })
    // .then(data =>{
    //     console.log(data);
    // })
    var oAuthReq = new XMLHttpRequest();
    oAuthReq.open("GET","https://github.com/login/oauth/authorize?client_id=9e81e0b5b9e1a677e973&tate=actionspace",true);
    oAuthReq.send();
}