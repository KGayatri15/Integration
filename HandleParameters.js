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
    return data;    
}