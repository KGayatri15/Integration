var authorization,spreadsheetId,range,assign = false;
var outputArray = [];
var arr = ['A','B','C','D','E','F','G','H','I','J','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
var info = {
    'spreadsheet':{
        'url':'https://sheets.googleapis.com/v4/spreadsheets',
        'headers':{
            'Accept':'application/json',
            'Content-Type':'application/json',
        }
    },
}
window.addEventListener('load',()=>{
    var service = HttpService.unbuildEndodedUri(window.location.href);
    authorization = service['token_type'] +" "+service['access_token'];
    console.log("Authorization:--- " + authorization);
})
function buttonClick(event,type){
    var body;
    event.preventDefault();
    var header = info['spreadsheet']['headers'];
    header['Authorization'] = authorization;
    var url = info['spreadsheet']['url'];
    assign = false;
    if(type === 'CREATE'){
        assign = true;
        body = {
            "properties":{
                "title":'JSON2Spreadsheet'
            },  
        }
        console.log("Assign:- " + assign);
        HttpService.fetchRequest(url,HttpService.requestBuilder("POST",header,JSON.stringify(body)));
    }else if(type === 'APPEND' && spreadsheetId != undefined){
        console.log("SpreadsheetID:- " + spreadsheetId);
        var output = mutate.Obj2(sample, []);
        range = "Sheet1!A1:" + arr[output[0].length -1] + (output.length);
        url = url +'/' + spreadsheetId +'/values/' + range +':append?valueInputOption=USER_ENTERED';
        body = {
            "range":range,
            "majorDimension":"ROWS",
            "values":output
        }
        HttpService.fetchRequest(url,HttpService.requestBuilder("POST",header,JSON.stringify(body)));  
    }else if(type === 'GET' && spreadsheetId != undefined){
        url = url + '/' + spreadsheetId + '/values/' + range;
        HttpService.fetchRequest(url,HttpService.requestBuilder("GET",header));
        // var outputJson = mutate.arr2Object(outputArray,outputArray[0] ,{});
        // console.log("Output :- Array To Object");
        // console.log(outputJson);
    }else{
        alert("Spreadsheet is not defined,Create a spreadsheet initially.");
    }
}

