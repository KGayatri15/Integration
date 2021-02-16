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
    static async getRange(output){
        range = "Sheet1!A1:" + arr[output[0].length -1] + (output.length);
    }
    static async handleActions(event,type){
        event.preventDefault();var body,response;
        var header = info['spreadsheet']['headers'];
        header['Authorization'] = authorization;
        var url = info['spreadsheet']['url'];
        output = mutate.Obj2(actionflowSample, []);
        switch(type){
            case "CREATE":{
                            body = {
                                "properties":{
                                    "title":'Credentials'
                                },  
                            }
                            response = await HttpService.fetchRequest(url,HttpService.requestBuilder("POST",header,JSON.stringify(body)));
                            spreadsheetId = response.spreadsheetId;
                            console.log(spreadsheetId);
                            break;
                        }
            case "APPEND":{
                            console.log("The JSON Input" + actionflowSample);
                            var output = mutate.Obj2(actionflowSample, []);
                            console.log(output);
                            await JSON2Spreadsheet.getRange(output);
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
                           var json = await mutate.arr2Object(response.values,response.values[0],{});
                           console.log(json);
                           break;
            }
            default:alert("Spreadsheet is not defined,Create a spreadsheet initially.");
        }
    }
}
function loadData(event){
    Authorization.authToken(window.location.href);
    console.log("SpreadsheetID" + localStorage.getItem(authorization));
    if(localStorage.getItem(authorization)=== null)
        Credentials.actions(event,"CREATE")
}
class Credentials{
    static async actions(event,type,arr){
        event.preventDefault();var body,response;
        var header = info['spreadsheet']['headers'];
        header['Authorization'] = authorization;
        var url = info['spreadsheet']['url'];
        switch(type){
            case "CREATE":{
                body = {
                    "properties":{
                        "title":'Credentials'
                    },  
                }
                response = await HttpService.fetchRequest(url,HttpService.requestBuilder("POST",header,JSON.stringify(body)));
                spreadsheetId = response.spreadsheetId;
                console.log("SpreadsheetID" + spreadsheetId);
                localStorage.setItem(authorization,spreadsheetId);
                break;
            }
            case "SIGNUP":{
                var id;
                console.log("Array values:->" + arr);
                var url1 = url + '/' + localStorage.getItem(authorization) + '/values/Sheet1!A1:B1000';
                var data = await HttpService.fetchRequest(url1,HttpService.requestBuilder("GET",header));
                if(!data.values && !data.error)
                    id = 1;
                else if(!data.error)
                    id = data.values[0].length + 1;
                var range = "Sheet1!A" + id + ":B" + id;
                url = url +'/' + localStorage.getItem(authorization) +'/values/' + range +':append?valueInputOption=USER_ENTERED';
                body = {
                    "range":range,
                    "majorDimension":"ROWS",
                    "values":[arr]
                }
                response =await HttpService.fetchRequest(url,HttpService.requestBuilder("POST",header,JSON.stringify(body))); 
                if(!response.error){
                    alert("Registered your credentials");
                }
                break;
            }
            case "LOGIN":{
              
                    url = url + '/' + localStorage.getItem(authorization) + '/values/Sheet1!A1:B1000';
                    response =await HttpService.fetchRequest(url,HttpService.requestBuilder("GET",header));
                    console.log(response.values);
                    if(!response.values)
                        alert('No Users exist');
                    else{
                        var data = response.values.filter(e => e[0] === arr[0]&&e[1] === arr[1]);
                        if(data.length > 0)
                                alert('Entered correct credentials');
                        else
                                alert("Wrong Username and password")
                    }
                    break;
            }
          
        }
    }
}
class SignUpAndLogin{
    static signup(event){
        event.preventDefault();
        var username = document.getElementById('Rusername').value;
        var password = document.getElementById('Rpassword').value;
        var arr = [username,password];
        Credentials.actions(event,"SIGNUP",arr);
    }
    static login(event){
        event.preventDefault();
        var username = document.getElementById('username').value;
        var password = document.getElementById('password').value;
        var arr = [username,password];
        Credentials.actions(event,"LOGIN",arr);
    }
}

