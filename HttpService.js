const boundary = '-------314159265358979323846';
const delimiter = "\r\n--" + boundary + "\r\n";
const close_delim = "\r\n--" + boundary + "--";
class HttpService{
    
    static urlBuilder(url,params){
        var service = url +"?" +HttpService.buildEncodedUri(params);
        return service;
    }
    static async requestBuilder(method,headers,body){
        var request = {
            method:method,
            cache: 'no-cache',
            withCredentials:true, 
            credentials: 'include', 
            headers:headers
        }
        if(body !== undefined)
            request[body] = body;
        console.log(request);
        return request;
    }
    static async Upload(url,type,header,file,folder){
        console.log("Uploading File Data");
        console.log(file.name);
        var contentType = file.type || 'application/octet-stream';
        var metadata = {
            'name':file.name,
            'title':file.name,
            'mimeType':contentType,
        }
        if(folder === "appDataFolder")
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
            return HttpService.fetchRequest(url,HttpService.requestBuilder(type,header,multipartRequestBody));
       }
    }
    static async fetchRequest(url,request){
    var response;
    await  fetch(url,request)
           .then(response=>response.json())
           .then(data=>{
                if(!data.errors){
                    console.log(data);
                    response = data;
                }else{
                    console.log(data.errors);
                }
            })
            .catch(err=>{
                console.log("Failed to make a request due to " + err);
            })
    if(response)
            return response;
    }
    static buildEncodedUri(request) {
        const response = [];
        for (let d in request){
            response.push(encodeURIComponent(d) + '=' + encodeURIComponent(request[d]));
        }
        return response.join('&');
    }
    static unbuildEndodedUri(request) { 
        var urifragment = request.split("&"), data = {}, i, parts;
        //process each par
        for (i = 0; i < urifragment.length; i++) {
            parts = urifragment[i].split("=");
            if (parts.length < 2) {
                parts.push("");
            }
            data[decodeURIComponent(parts[0])] = decodeURIComponent(parts[1]);
        } 
        console.log(data);
        return data;    
    }    
}