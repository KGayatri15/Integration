var authorization,id;
var search = false,files = [];folder = "root",
window.addEventListener('load',()=>{
    var service = HttpService.unbuildEndodedUri(window.location.href);
    authorization = service['token_type'] +" "+service['access_token'];
    console.log("Authorization:--- " + authorization);
})
var info = {
    "others":{
            "url":"https://www.googleapis.com/drive/v3/files",
            "headers":{
                'Accept':'application/json'
            }
    },
    "upload":{
            "url":"https://www.googleapis.com/upload/drive/v3/files",
            "headers":{
                'upload':'multipart',
                'Content-Type': 'multipart/related; boundary=' + boundary,
            },
    },
}
function buttonClick(event,type){  
    event.preventDefault();
    document.getElementById('appData').checked ? folder = "appDataFolder":folder = "root";
    type === "SEARCH"?search = true:search = false;
    var header,url;
    if(type === "POST" ||type === "PATCH"){
        header = info['upload']['headers'];
        url = info['upload']['url'];
    }else{
        header = info['others']['headers'];
        url = info['others']['url'];
    }
    header['Authorization'] = authorization; 
    console.log("THE id:---- "+ id);
    if(type==="GET"||type==="SEARCH"){
        if(folder === "appDataFolder")
            url = url + "?spaces=appDataFolder";
        if(type === "SEARCH"){
            var param = "q=name='" + document.getElementById('name').value + "'";
            if(url.includes("?")){
                url = url +"&" + param;
            }else{
                url = url +"?" + param;
            }
        } 
        console.log(url);
        HttpService.fetchRequest(url,HttpService.requestBuilder("GET",header));
    }else if(type === "POST" || type === "PATCH"){
        var file;
        if(type === "PATCH"){
            url = url + "/" + id;
            file = document.getElementById('update').files[0];
        }else
            file = document.getElementById('file').files[0];
        HttpService.Upload(url,type,header,file,folder);
    }else if(type === 'DELETE'){
        if(confirm("Are you sure you want to delete file " + files[0].name + " of mimeType: " + files[0].mimeType)){
            url = url +"/" + id;
            HttpService.fetchRequest(url,HttpService.requestBuilder(type,header));
            document.getElementById('name').value = '',files = [],id = '';
        }
    } 
}
