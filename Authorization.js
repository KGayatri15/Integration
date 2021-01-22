var Authorization = {
    'google':{
        'url':'https://accounts.google.com/o/oauth2/v2/auth?',
        'params':{
            'client_id': '1053381465878-vb5nntqvopdnbag9f060pon9d7qh81j4.apps.googleusercontent.com',
            'redirect_uri': 'https://kgayatri15.github.io/GithubIntegration/upload.html',
            'scope': 'https://www.googleapis.com/auth/drive https://www.googleapis.com/auth/drive.appdata',
            'state': 'ActionSpaceEditor',
            'include_granted_scopes': 'true',
            'prompt':'consent',
            'response_type': 'token'
        }
    },
    'github':{
        'url':'https://github.com/login/oauth/authorize?',
        'params':{
            'client_id':'9e81e0b5b9e1a677e973',
            'scope':'repo',
            'state':'actionspace'
        }
    }
}
function oAuth(data){
    console.log("In oAuth()");
    var service = Authorization[data]['url'] + buildEncodedUri(Authorization[data]['params']);
    console.log(service);
    window.location.href = service;
}
