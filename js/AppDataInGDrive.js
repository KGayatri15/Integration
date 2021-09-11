var authorization,id,files = [];
var info = {
    "others":{
            "url":"https://www.googleapis.com/drive/v3/files?spaces=appDataFolder",
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
class AppDataFolder{
static async HandleRequest(event,type){
    event.preventDefault();var header,url,response;
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
                        response = await HttpService.fetchRequest(url,HttpService.requestBuilder("GET",header));
                        break;
                    }
        case "SEARCH":{
                        url =  url + "&q=name='" + document.getElementById('name').value + "'";
                        response =await HttpService.fetchRequest(url,HttpService.requestBuilder("GET",header));
                        if(response.files.length > 0)
                            files = response.files;id = files[0].id;
                        console.log(files + ":"+ id);
                        break;
                    }
        case "POST":{   
                        var body = await HttpService.FileUpload(document.getElementById('file').files[0],true);
                        response = await HttpService.fetchRequest(url,HttpService.requestBuilder(type,header,body));
                        break;
                    }
        case "PATCH":{
                        url = url + "/" + id;
                        var body = await HttpService.FileUpload(document.getElementById('update').files[0],true);
                        response = await HttpService.fetchRequest(url,HttpService.requestBuilder(type,header,body));
                        break;
                    }
        case "DELETE":{
                        if(confirm("Are you sure you want to delete file " + files[0].name + " of mimeType: " + files[0].mimeType)){
                            url = url +"/" + id;
                            response = await HttpService.fetchRequest(url,HttpService.requestBuilder(type,header));
                            document.getElementById('name').value = '',files = [],id = '';
                        }
                        break;
                      }
    } 
    console.log(response);
  }
}