function oAuth(){
    console.log("In oAuth()");
    var oAuthReq = new XMLHttpRequest();
    oAuthReq.open("GET","https://github.com/login/oauth/authorize?client_id=9e81e0b5b9e1a677e973&scope=repo&state=actionspace",true);
    oAuthReq.send();
}
//client-id - 1053381465878-vb5nntqvopdnbag9f060pon9d7qh81j4.apps.googleusercontent.com
//client-secret - Wtewu9zg0q8TlcPC1Des1Na1
function GoogleSignIn(){
    var clientId = '1053381465878-vb5nntqvopdnbag9f060pon9d7qh81j4.apps.googleusercontent.com';
    var redirect_uri = "https://kgayatri15.github.io/GithubIntegration/upload.html";
    var scope = "https://www.googleapis.com/auth/drive";
    var url = "https://accounts.google.com/o/oauth2/v2/auth?redirect_uri="+redirect_uri
    +"&prompt=consent&response_type=code&client_id="+clientId+"&scope="+scope
    +"&access_type=offline";
    window.location = url;
}