function oAuth(){
    console.log("In oAuth()");
    var url = "https://github.com/login/oauth/authorize?";
    var params = {
        'client_id':'9e81e0b5b9e1a677e973',
        'scope':'repo',
        'state':'actionspace'
    }
    var uri = buildEncodedUri(params);
    var service = url + uri;
    window.location.href = service;
}
function GoogleSignIn(){
    var params = {
        'client_id': '1053381465878-vb5nntqvopdnbag9f060pon9d7qh81j4.apps.googleusercontent.com',
        'redirect_uri': 'https://kgayatri15.github.io/GithubIntegration/upload.html',
        'scope': 'https://www.googleapis.com/auth/drive https://www.googleapis.com/auth/drive.appdata',
        'state': 'ActionSpaceEditor',
        'include_granted_scopes': 'true',
        'prompt':'consent',
        'response_type': 'token'
    };
    var uri = buildEncodedUri(params);
    var url = 'https://accounts.google.com/o/oauth2/v2/auth?';  
    var service = url + uri;
    window.location.href = service;
}
