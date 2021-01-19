var authorization;
window.addEventListener('load',()=>{
    var service = unbuildEndodedUri(window.location.href);
    authorization = service['token_type'] +" "+service['access_token'];
    console.log("AUthorization: " + authorization);
})
function upload(event){
    event.preventDefault();
    var url ='https://www.googleapis.com/drive/v2/files'; //'https://www.googleapis.com/upload/drive/v2/files?' ;
    fetch(url,{
        method:'GET',
        cache: 'no-cache',
        withCredentials:true, 
        credentials: 'include', 
        headers:new Headers({
            'Authorization':authorization,
            'Accept':'application/json'
        }),
    })
    .then(data =>{
        if(data.status === 200){
          Promise.resolve(data);
          var res = data.json();
          console.log(res);
        }else
          Promise.reject(new Error(data));
    })
    .catch(err=>Promise.reject(new Error(err)))
    //document.getElementById('file').value = '';
}
function uploadFile(event){
    event.preventDefault();
    var file = document.getElementById('file').files[0];
    console.log(file.name);
    const boundary = '-------314159265358979323846';
    const delimiter = "\r\n--" + boundary + "\r\n";
    const close_delim = "\r\n--" + boundary + "--";
    var contentType = file.type || 'application/octet-stream';
    var metadata = {
        'name':file.name,
        'mimeType':contentType
    }
    var reader = new FileReader();
    reader.readAsBinaryString(file);
    reader.onload = function(e){
        console.log("Reader loaded");
        var base64Data = btoa(reader.result);
        var multipartRequestBody =
        delimiter + 'Content-Type: application/json\r\n\r\n' +JSON.stringify(metadata) +
        delimiter + 'Content-Type: ' + contentType + '\r\n' +  
        'Content-Transfer-Encoding: base64\r\n' + '\r\n' + base64Data + close_delim;
    fetch('https://www.googleapis.com/upload/drive/v3/files',{
        method:'POST',
        cache: 'no-cache',
        withCredentials:true, 
        credentials: 'include', 
        headers:{
            'Authorization':authorization,
            'upload':'multipart',
            'Content-Type': 'multipart/related; boundary=' + boundary,
        },
        body:multipartRequestBody
    })
    .then(data =>{
        if(data.status === 200){
          Promise.resolve(data);
          var res = data.json();
          console.log(res);
        }else{
            console.log(data.json());
           Promise.reject(new Error(data));
        }
    })
    .catch(err=>{
        console.log(err);
        Promise.reject(new Error(err));
    })
    }
}  