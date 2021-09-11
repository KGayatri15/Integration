var Authorize = {
    'google':{
        'url':'https://accounts.google.com/o/oauth2/v2/auth',
        'params':{
            'client_id': '1053381465878-vb5nntqvopdnbag9f060pon9d7qh81j4.apps.googleusercontent.com',
            'redirect_uri':'https://kgayatri15.github.io/Integration/html/Gdrive.html',//'http://127.0.0.1:5500/html/Gdrive.html',
            'scope': "https://www.googleapis.com/auth/drive",
            'state': 'ActionSpaceEditor',
            'include_granted_scopes': 'true',
            'prompt':'consent',
            'response_type': 'token'
        }
    },
    'json':{
        'url':'https://accounts.google.com/o/oauth2/v2/auth',
        'params':{
            'client_id': '1053381465878-vb5nntqvopdnbag9f060pon9d7qh81j4.apps.googleusercontent.com',
            'redirect_uri': 'https://kgayatri15.github.io/Integration/html/json2Spreadsheet.html',//'http://127.0.0.1:5500/html/json2Spreadsheet.html',//
            'scope': "https://www.googleapis.com/auth/drive https://www.googleapis.com/auth/spreadsheets",
            'state': 'ActionSpaceEditor',
            'include_granted_scopes': 'true',
            'prompt':'consent',
            'response_type': 'token'
        }
    },
    'appData':{
        'url':'https://accounts.google.com/o/oauth2/v2/auth',
        'params':{
            'client_id': '1053381465878-vb5nntqvopdnbag9f060pon9d7qh81j4.apps.googleusercontent.com',
            'redirect_uri':'https://kgayatri15.github.io/Integration/html/AppDataInGDrive.html',//'http://127.0.0.1:5500/html/AppDataInGDrive.html',
            'scope': "https://www.googleapis.com/auth/drive https://www.googleapis.com/auth/drive.appdata",
            'state': 'ActionSpaceEditor',
            'include_granted_scopes': 'true',
            'prompt':'consent',
            'response_type': 'token'
        }
    },

}
class Authenticate{
    static oAuth(event,data){
        event.preventDefault();console.log("In oAuth()");
        var service = HttpService.urlBuilder(Authorize[data]['url'],Authorize[data]['params']);
        console.log(service);
        window.location.href = service;

    }
    static authToken(uri){
        var service = HttpService.unbuildEndodedUri(uri);
        authorization = service['token_type'] +" "+service['access_token'];
        console.log("Authorization:--- " + authorization);
    }
}
