var authorization,spreadsheetId,range;
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
class JSON2Spreadsheet{
    static async handleActions(event,type){
        event.preventDefault();var body,response;
        var header = info['spreadsheet']['headers'];
        header['Authorization'] = authorization;
        var url = info['spreadsheet']['url'];
        switch(type){
            case "CREATE":{
                            body = {
                                "properties":{
                                    "title":'Tables'
                                },  
                            }
                            response = await HttpService.fetchRequest(url,HttpService.requestBuilder("POST",header,JSON.stringify(body)));
                            spreadsheetId = response.spreadsheetId;
                            console.log(spreadsheetId);
                            break;
                        }
            case "APPEND":{
                            var output = mutate.Obj2(sample, []);
                            range = "Sheet1!A1:" + arr[output[0].length -1] + (output.length);
                            url = url +'/' + spreadsheetId +'/values/' + range +':append?valueInputOption=USER_ENTERED';
                            body = {
                                "range":range,
                                "majorDimension":"ROWS",
                                "values":output
                            }
                            response =await HttpService.fetchRequest(url,HttpService.requestBuilder("POST",header,JSON.stringify(body))); 
                            break;
            }
            case "GET":{
                            url = url + '/' + spreadsheetId + '/values/' + range;
                            response =await HttpService.fetchRequest(url,HttpService.requestBuilder("GET",header));
                            var values = response.values;
                            var json = mutate.arr2Object(values,values[0],{});
                            console.log(json);
                            break;
            }
            default:alert("Spreadsheet is not defined,Create a spreadsheet initially.");
        }
    }
}

