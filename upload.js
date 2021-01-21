var authorization;
var files = [];
var id;
const boundary = '-------314159265358979323846';
const delimiter = "\r\n--" + boundary + "\r\n";
const close_delim = "\r\n--" + boundary + "--";
window.addEventListener('load',()=>{
    var service = unbuildEndodedUri(window.location.href);
    authorization = service['token_type'] +" "+service['access_token'];
    console.log("AUthorization: " + authorization);
})
function getFiles(event){
    console.log("Get files")
    event.preventDefault();
    var url ="https://www.googleapis.com/drive/v2/files";
    if(document.getElementById('appData').checked)
        url = url +"?spaces=appDataFolder";
    console.log(url);
    fetch(url,{
        method:'GET',
        cache: 'no-cache',
        withCredentials:true, 
        credentials: 'include', 
        headers:{
            'Authorization':authorization,
            'Accept':'application/json'
        },
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
}
function uploadFile(event){
    console.log("Uploading File");
    event.preventDefault();
    var file = document.getElementById('file').files[0];
    console.log(file.name);
    var contentType = file.type || 'application/octet-stream';
    var metadata = {
        'name':file.name,
        'title':file.name,
        'mimeType':contentType,
    }
    if(document.getElementById('appData').checked)
            metadata['parents'] = ['appDataFolder'];//storing file in application Data folder
    console.log(metadata);
    var reader = new FileReader();
    reader.readAsBinaryString(file);
    reader.onload = function(e){
        console.log("Reader loaded");
        var base64Data = btoa(reader.result);
        var multipartRequestBody =
        delimiter + 'Content-Type: application/json\r\n\r\n' +JSON.stringify(metadata) +
        delimiter + 'Content-Type: ' + contentType + '\r\n' +  
        'Content-Transfer-Encoding: base64\r\n' + '\r\n' + base64Data + close_delim;
        var url = 'https://www.googleapis.com/upload/drive/v3/files'
    fetch(url,{
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
function searchFile(event){
    console.log("Search for a file");
    event.preventDefault();
    var fileName = document.getElementById('name').value;
    var url ="https://www.googleapis.com/drive/v3/files?q=name='"+ fileName+"'";
    if(document.getElementById('appData').checked)
        url = url + "&spaces=appDataFolder";
    console.log(url);
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
    .then(response=>response.json())
    .then(data=>{
       console.log(data);
       files = data.files;
       console.log(files);
    })
    .catch(err=>{return Promise.reject(new Error(err))})
}
function deleteFile(event){
    console.log("There is/are " + files.length + " file similar to your search");
    if(confirm("Are you sure you want to delete file " + files[0].name + " of mimeType: " + files[0].mimeType)){
        id = files[0].id;
        var url = 'https://www.googleapis.com/drive/v2/files/' + id;
        fetch(url,{
            method:'DELETE',
            cache: 'no-cache',
            withCredentials:true, 
            credentials: 'include', 
            headers:new Headers({
                'Authorization':authorization,
            }),
        })
        .then(response=>{
            if(! (response.status >= 200 && response.status <= 300)){
                new Error(response);
            }else{
                console.log(response);
            }
        })
        .catch(err=>console.log(err))
    }
    document.getElementById('name').value = '',files = [],id = '';
    console.log(files + " "+ id);
}
function updateFile(event){
    console.log("Updating0 file");
    id = files[0].id;
    event.preventDefault();
    var file = document.getElementById('update').files[0];
    console.log(file.name);
    var contentType = file.type || 'application/octet-stream';
    var metadata = {
        'name':file.name,
        'title':file.name,
        'mimeType':contentType,
    }
    if(document.getElementById('appData').checked)
        metadata['parents'] = ['appDataFolder'],//storing file in application Data folder
    console.log(metadata);
    var reader = new FileReader();
    reader.readAsBinaryString(file);
    reader.onload = function(e){
        console.log("Reader loaded");
        var base64Data = btoa(reader.result);
        var multipartRequestBody =
        delimiter + 'Content-Type: application/json\r\n\r\n' +JSON.stringify(metadata) +
        delimiter + 'Content-Type: ' + contentType + '\r\n' +  
        'Content-Transfer-Encoding: base64\r\n' + '\r\n' + base64Data + close_delim;
    var url = 'https://www.googleapis.com/upload/drive/v2/files/' + id;
    fetch(url,{
        method:'PUT',
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