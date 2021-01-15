function oAuth(){
    console.log("In oAuth()");
    var oAuthReq = new XMLHttpRequest();
    oAuthReq.open("GET","https://github.com/login/oauth/authorize?client_id=9e81e0b5b9e1a677e973&scope=repo&state=actionspace",true);
    oAuthReq.send();
}