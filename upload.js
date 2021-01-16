
window.addEventListener('load',()=>{
    var request = window.location.href;
    var service = unbuildEndodedUri(request);
    console.log(service);

})
function upload(event){
    event.preventDefault();
    console.log("File Upload API in progress");
    var url = 'https://www.googleapis.com/upload/drive/v2/files' ;
    const boundary = '-------314159265358979323846';
    const delimiter = "\r\n--" + boundary + "\r\n";
    const close_delim = "\r\n--" + boundary + "--";
    var urlParams = new URLSearchParams(window.location.search);
    var params = {
        "Authorization":urlParams.get('token_type') + urlParams.get('access_token'),
        'uploadType':'multipart',
        'Content-Type': 'multipart/mixed; boundary="' + boundary + '"'
    }
    var file = document.getElementById('file');
    var reader = new FileReader();
   // reader.readAsBinaryString(file);
    reader.onload = function(e) {
    var contentType = file.type || 'application/octet-stream';
    var metadata = {
      'title': file.fileName,
      'mimeType': contentType
    };
    console.log("contentType:- "+contentType +"metadata:- " +metadata);
    var base64Data = btoa(reader.result);
    var multipartRequestBody =
        delimiter + 'Content-Type: application/json\r\n\r\n' +JSON.stringify(metadata) +
        delimiter + 'Content-Type: ' + contentType + '\r\n' +
       'Content-Transfer-Encoding: base64\r\n' + '\r\n' + base64Data + close_delim;
    fetch(url,{
        method:'POST',
        mode:'cors',
        cache:'no-cache',
        credentials:'same-origin',
        headers:params,
        redirect:'follow',
        referrerPolicy:'no-referrer',
        body:multipartRequestBody
    })
    .then(data =>{console.log(data)})
    .catch(err =>console.log("Error :- " + err))
    }
}
