var service;
window.addEventListener('load',()=>{
    var request = window.location.href;
    service = unbuildEndodedUri(request);
})
function upload(event){
    event.preventDefault();
    console.log("File Upload API in progress");
    var url = 'https://www.googleapis.com/upload/drive/v3/files?' ;
    var urlParams = new URLSearchParams(service);
    console.log(urlParams.get('token_type') +" "+ urlParams.get('access_token'));
    var file = document.getElementById('file').files[0];
    var params = {
        "Authorization": urlParams.get('token_type') +" "+ urlParams.get('access_token'),
        'uploadType':'media',
        'Content-Type':file.type,
        'Content-Length':file.size
    }
    var formData = new FormData();
    formData.append("file", file);
    console.log("filename:- " + file.name);
    var service_url = url + buildEncodedUri(params);
    fetch(url,{
        method:'POST',
        mode:'cors',
        cache:'no-cache',
        credentials:'same-origin',
        headers:params,
        redirect:'follow',
        referrerPolicy:'no-referrer',
        body:file
    })
    .then(data =>{
    console.log("File Upload successful");
    console.log("Status:- " + data.status);
    console.log(data);
    })
    .catch(err =>console.log("Error :- " + err))

    //document.getElementById('file').value = '';

}
