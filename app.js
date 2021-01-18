window.addEventListener('load',()=>{
    const url = new URL(window.location.href);
    var urlParams = new URLSearchParams(url.search);
    var code = urlParams.get('code');
    var params = {
           client_id:'9e81e0b5b9e1a677e973',
           client_secret:'2b16a81475193f5ac75903a8477a7df30ea2471f',
           code:code,
           state:urlParams.get('state')
    }
    console.log(params);
    var uri = 'https://crossorigin.me/https://github.com/login/oauth/access_token?';
    var service = uri + buildEncodedUri(params);
    fetch(service,{
       method:"POST",
       mode:'cors',
       cache:'no-cache',
       redirect:'follow',
       referrer:url,
       headers:{
        'Origin':'http://127.0.0.1:5500',
       }
   })
   .then(data =>console.log(data))
   .catch(err=>console.log(err))
   })