var authorization,spreadsheetId,range;
var arr = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
var info = {
    'spreadsheet':{
        'url':'https://sheets.googleapis.com/v4/spreadsheets',
        'headers':{
            'Accept':'application/json',
            'Content-Type':'application/json',
        }
    },
}

window.onload = (event) => {
    Authenticate.authToken(window.location.href);
    console.log("SpreadsheetID" + localStorage.getItem(authorization));
    if(localStorage.getItem(authorization)=== null)
        Credentials.actions(event,"CREATE")
}
class Credentials{
    static async actions(event,type,output){
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
                console.log("Array values:->" + output);
                var url1 = url + '/' + localStorage.getItem(authorization) + '/values/Sheet1!A1:Z1000';
                var data = await HttpService.fetchRequest(url1,HttpService.requestBuilder("GET",header));
                var range ,array;
                if(!data.values && !data.error){
                    range = "Sheet1!A1:" + arr[output[0].length -1] + (output.length);
                    array = output;
                }else if(!data.error){
                    if(data.values.filter(e=> e[6] === output[1][6]).length > 0){
                        alert('Username already exists');
                        break;
                    }
                    var id = data.values[0].length + 1;
                    range = "Sheet1!A" + (data.values.length + 1) + ":" + arr[output[0].length -1]+ id;
                    array = [output[1]];
                }
                url = url +'/' + localStorage.getItem(authorization) +'/values/' + range +':append?valueInputOption=USER_ENTERED';
                body = {
                    "range":range,
                    "majorDimension":"ROWS",
                    "values":array
                }
                response =await HttpService.fetchRequest(url,HttpService.requestBuilder("POST",header,JSON.stringify(body))); 
                break;
            }
            case "LOGIN":{
                    url = url + '/' + localStorage.getItem(authorization) + '/values/Sheet1!A1:Z1000';
                    response =await HttpService.fetchRequest(url,HttpService.requestBuilder("GET",header));
                    console.log(response.values);
                    if(!response.values)
                        alert('No Users exist');
                    else{
                        var range,update;
                        var index = Credentials.findRowIndex(response.values,output[0]);
                        if(data === 0){
                            alert("Username doesn't exist");
                        }else{
                            if(response.values[index][7] === output[1]){
                                range = "Sheet1!"+ arr[8] + (index+1) + ":" + arr[9] + (index + 1);
                                var successfulAttempt = parseInt(response.values[index][9]) + 1;
                                update = [[new Date(),successfulAttempt]];
                            }else{
                                range = "Sheet1!"+ arr[10] + (index+1);
                                var unsuccessfulAttempt = parseInt(response.values[index][10]) + 1;
                                console.log("For this unsuccessful attempt :- " + range + ":::" + unsuccessfulAttempt);
                                update = [[unsuccessfulAttempt],];
                            }
                            var uri = info['spreadsheet']['url'] +'/' + localStorage.getItem(authorization) +'/values/' + range +'?valueInputOption=USER_ENTERED';
                            body = {
                                "range":range,
                                "majorDimension":"ROWS",
                                "values":update
                            }
                            var response2 =await HttpService.fetchRequest(uri,HttpService.requestBuilder("PUT",header,JSON.stringify(body))); 
                            console.log("Response 2 of Login:->" + response2);
                        }
                    }
                    break;
            }
        }
        return response;
    }
    static findRowIndex(data ,username){
        for(var i = 0;i <data.length ;i++){
                if(data[i][6] === username){
                    console.log("The index is" + i);
                    return i;
                }
        }
        return 0;
    }
}
class SignUpAndLogin{
    static async signup(event){
        event.preventDefault();
        var username = document.getElementById('Rusername').value;
        var password = document.getElementById('Rpassword').value;
        var json = {
            'credentials':{
            'Username':username,
            'Password':password,
            'LatestLoginTime':"",
            'SuccessfulAttempt':0,
            'UnsucessfulAttempt':0,
            }
        }
        var output = mutate.Obj2(json, []);
        console.log(output);
        Credentials.actions(event,"SIGNUP",output);
    }
    static async login(event){
        event.preventDefault();
        var username = document.getElementById('username').value;
        var password = document.getElementById('password').value;
        var arr = [username,password];
        Credentials.actions(event,"LOGIN",arr);
    }
}

