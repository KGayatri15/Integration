function oAuth(){
    console.log("In oAuth()");
    var oAuthReq = new XMLHttpRequest();
    oAuthReq.open("GET","https://github.com/login/oauth/authorize?client_id=9e81e0b5b9e1a677e973&scope=repo&state=actionspace",true);
    oAuthReq.send();
}
//client-id - 1053381465878-vb5nntqvopdnbag9f060pon9d7qh81j4.apps.googleusercontent.com
//client-secret - Wtewu9zg0q8TlcPC1Des1Na1
var params = {
    'client_id': '1053381465878-vb5nntqvopdnbag9f060pon9d7qh81j4.apps.googleusercontent.com',
    'redirect_uri': 'https://kgayatri15.github.io/GithubIntegration/upload.html',
    'scope': 'https://www.googleapis.com/auth/drive',
    'state': 'ActionSpaceEditor',
    'include_granted_scopes': 'true',
    'response_type': 'token'
};
function GoogleSignIn(){
    var uri = buildEncodedUri(params);
    var url = 'https://accounts.google.com/o/oauth2/v2/auth?';  
    var service = url + uri;
    window.location.href = service;
}
function buildEncodedUri(request) {
    const response = [];
    for (let d in request){
        console.log(d);
        response.push(encodeURIComponent(d) + '=' + encodeURIComponent(request[d]));
    }
    console.log(response);
    return response.join('&');
}