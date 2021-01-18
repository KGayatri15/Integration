function upload(event){
    event.preventDefault();
    console.log("File Upload API in progress");
    var service = unbuildEndodedUri(window.location.href);
    var urlParams = new URLSearchParams(service.search);
    console.log(urlParams.get('token_type') +" "+ urlParams.get('access_token'));
    var file = document.getElementById('file').files[0];
    var r = new FileReader();
    r.onload = function(){ alert(r.result); };
    var url = 'https://www.googleapis.com/upload/drive/v3/files?' ;
    var params = {
        "Authorization": urlParams.get('token_type') +" "+ urlParams.get('access_token'),
        'uploadType':'media',
        'Content-Type':file.type,
    }
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
