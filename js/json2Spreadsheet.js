var authorization;
var arr = ['A','B','C','D','E','F','G','H','I','J','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
var info = {
    'spreadsheet':{
        'url':'https://sheets.googleapis.com/v4/spreadsheets',
        'headers':{
            'Accept':'application/json'
        }
    }
}
window.addEventListener('load',()=>{
    var service = HttpService.unbuildEndodedUri(window.location.href);
    authorization = service['token_type'] +" "+service['access_token'];
    console.log("Authorization:--- " + authorization);
})
function buttonClick(event){
    event.preventDefault();
    var header = {
        'Authorization':authorization,
        'Accept': 'application/json',
        'Content-Type':'application/json',
    }
    var body = {
        "properties":{
            "title":'SampleSchema'
        },  
    }
    HttpService.fetchRequest(info['spreadsheet']['url'],HttpService.requestBuilder("POST",header,JSON.stringify(body)))
}
 // "range":"Sheet1!A1:" + arr[outputArray[0].length -1] + (outputArray.length),
// "majorDimension":"ROWS",
// "values":outputArray
//var outputArray = mutate.Obj2(sample, []);
// console.log(outputArray.length);
// console.log(outputArray);
