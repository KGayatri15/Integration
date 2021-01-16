
window.addEventListener('load',()=>{
    var request = window.location.href;
    var service = unbuildEndodedUri(request);
})
function upload(event){
    event.preventDefault();
    console.log("File Upload API in progress");
    var url = 'https://www.googleapis.com/upload/drive/v2/files' ;
    var urlParams = new URLSearchParams(window.location.search);
    var params = {
        "Authorization":urlParams.get('token_type') +" "+ urlParams.get('access_token'),
        'uploadType':'media',  
    }
    var file = document.getElementById('file').files[0];
    var formData = new FormData();
    formData.append("file", file,file.name);
    formData.append("upload_file", true);
    console.log(formData);
    console.log("filename:- " + file.name);
    var service = url + buildEncodedUri(params);
    fetch(service,{
        method:'POST',
        mode:'cors',
        cache:'no-cache',
        credentials:'same-origin',
        redirect:'follow',
        referrerPolicy:'no-referrer',
        body:formData
    })
    .then(data =>{
    console.log("File Upload successful");
    console.log("Status:- " + data.status)
    if(data.ok)
        console.log(data);
    })
    .catch(err =>console.log("Error :- " + err))

    //document.getElementById('file').value = '';

}
