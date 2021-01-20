function buildEncodedUri(request) {
    const response = [];
    for (let d in request){
        response.push(encodeURIComponent(d) + '=' + encodeURIComponent(request[d]));
    }
    return response.join('&');
}
function unbuildEndodedUri(request) { 
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
async function fetchRequest(url,method,headers){
    console.log("URL:- " + url+" method:" + method);
    var response;
    await fetch(url ,{
        method:method,
        cache: 'no-cache',
        withCredentials:true, 
        credentials: 'include', 
        headers:headers,
    })
    .then(data =>{
        if(data.status === 200){
          console.log(data.json());
          return Promise.resolve(data);
        }else{
          return Promise.reject(new Error(data));
        }
    })
    .catch(err=>{return Promise.reject(new Error(err))})
}
async function FetchBodyRequest(url,method,headers,body){
    await fetch(url ,{
        method:method,
        cache: 'no-cache',
        withCredentials:true, 
        credentials: 'include', 
        headers:headers,
        body:body
    })
    .then(data =>{
        if(data.status === 200){
          console.log(data.json());
          return Promise.resolve(data);
        }else{
          return Promise.reject(new Error(data));
        }
    })
    .catch(err=>{return Promise.reject(new Error(err))})
}