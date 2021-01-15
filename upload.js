var urlParams = new URLSearchParams(window.location.search);
var code = urlParams.get('code');
console.log(code);
var redirect_uri = "https://kgayatri15.github.io/GithubIntegration/upload.html";
var client_secret = "Wtewu9zg0q8TlcPC1Des1Na1"; 
var scope = "https://www.googleapis.com/auth/drive";
var access_token= "";
var client_id = '1053381465878-vb5nntqvopdnbag9f060pon9d7qh81j4.apps.googleusercontent.com';
console.log(JSON.stringify({
    code:code,
    redirect_uri:redirect_uri,
    client_secret:client_secret,
    client_id:client_id,
    scope:scope,
    grant_type:"authorization_code"
 }));
window.addEventListener('load',()=>{
    fetch("https://oauth2.googleapis.com/token",{
        method:"POST",
        headers:{
            'Accept':'application/json'
        },
        body:JSON.stringify({
           code:code,
           redirect_uri:redirect_uri,
           client_secret:client_secret,
           client_id:client_id,
           scope:scope,
           grant_type:"authorization_code"
        })
    })
    .then(data => {
        console.log(data);
        console.log("Token" + data.access_token);
        console.log("refreshToken" + data.refreshToken);
        console.log("expires_in"+data.expires_in);
    })
  })