window.addEventListener('load',()=>{
    const uri = new URL(window.location.href);
    var urlParams = new URLSearchParams(uri.search);
    var params = {
           client_id:'9e81e0b5b9e1a677e973',
           client_secret:'2b16a81475193f5ac75903a8477a7df30ea2471f',
           code:urlParams.get('code'),
           state:urlParams.get('state')
    }
    var url = 'https://github.com/login/oauth/access_token';
    fetch(url,{
       method:"POST",
       mode:'cors',
       cache:'no-cache',
       withCredentials:true, 
       credentials: 'include', 
       headers:{
            'Accept':'application/json',
       },
       body:JSON.stringify(params)
   })
   .then(data =>console.log(data))
   .catch(err=>console.log(err))
   })