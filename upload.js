var service;
window.addEventListener('load',()=>{
    const url = new URL(window.location.href);
 //  var request = "https://kgayatri15.github.io/GithubIntegration/upload.html#state=ActionSpaceEditor&access_token=ya29.a0AfH6SMB69riSVYqYOSjvitF1gdvuj-eoAel9jMswVxJimOyA1a-R5ESvhZzNeKBtkWnLRd1FlNraYM3Yj2orrABNIG0C8C_8I71FplFiu-py8aP6QvuNWPwD86bNroHhL0lDU-j6bp3Ty43_8ZutPgM9QAJt_Sn-ib4g-pQ9HdIN&token_type=Bearer&expires_in=3599&scope=https://www.googleapis.com/auth/drive";
  service = unbuildEndodedUri(url.search);
})
function upload(event){
    event.preventDefault();
    console.log("File Upload API in progress");
    var url = 'https://www.googleapis.com/upload/drive/v2/files?' ;
    var urlParams = new URLSearchParams(service);
    console.log(urlParams.get('token_type') +" "+ urlParams.get('access_token'));
    var file = document.getElementById('file').files[0];
    var r = new FileReader();
    r.onload = function(){ alert(r.result); };
    
    var params = {
        "Authorization": urlParams.get('token_type') +" "+ urlParams.get('access_token'),
        'uploadType':'media',
        'Content-Type':file.type,
    }
    // var formData = new FormData();
    // formData.append("file", file);
    console.log("filename:- " + file.name);
    var service_url = url + buildEncodedUri(params);
    fetch(service_url,{
        method:'POST',
        mode:'cors',
        cache:'no-cache',
        redirect:'follow',
        referrerPolicy:'no-referrer',
        body:r.readAsBinaryString(file)
    })
    .then(data =>{
    console.log("File Upload successful");
    console.log("Status:- " + data.status);
    console.log(data);
    })
    .catch(err =>console.log("Error :- " + err))

    //document.getElementById('file').value = '';

}
