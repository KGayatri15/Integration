var authorization,id,files = [],assign = false;
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
class GDrive{
static HandleRequest(event,type){
    event.preventDefault();var header,url;
    type === "SEARCH"?assign = true:assign = false;
    if(type === "POST" ||type === "PATCH"){
        header = info['upload']['headers'];
        url = info['upload']['url'];
    }else{
        header = info['others']['headers'];
        url = info['others']['url'];
    }
    header['Authorization'] = authorization;
    switch(type){
        case "GET":{
                        HttpService.fetchRequest(url,HttpService.requestBuilder("GET",header));
                        break;
                    }
        case "SEARCH":{
                        url =  url + "?q=name='" + document.getElementById('name').value + "'";
                        HttpService.fetchRequest(url,HttpService.requestBuilder("GET",header));
                        break;
                    }
        case "POST":{
                        HttpService.Upload(url,type,header,document.getElementById('file').files[0]);
                        break;
                    }
        case "PATCH":{
                        url = url + "/" + id;
                        HttpService.Upload(url,type,header,document.getElementById('update').files[0]);
                        break;
                    }
        case "DELETE":{
                        if(confirm("Are you sure you want to delete file " + files[0].name + " of mimeType: " + files[0].mimeType)){
                            url = url +"/" + id;
                            HttpService.fetchRequest(url,HttpService.requestBuilder(type,header));
                            document.getElementById('name').value = '',files = [],id = '';
                        }
                        break;
                      }
    } 
  }
}