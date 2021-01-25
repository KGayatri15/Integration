var authorization;
window.addEventListener('load',()=>{
    var service = HttpService.unbuildEndodedUri(window.location.href);
    authorization = service['token_type'] +" "+service['access_token'];
    console.log("Authorization:--- " + authorization);
})
function convertToJSON(event){
    event.preventDefault();
    var file = document.getElementById('file').files[0];
    var sFilename = file.name;
    // Create A File Reader HTML5
    var reader = new FileReader();
    reader.readAsBinaryString(file);
    // Ready The Event For When A File Gets Selected
    reader.onload = function(e) {
        var data = e.target.result;
        var cfb = XLS.CFB.read(data, {type: 'binary'});
        var wb = XLS.parse_xlscfb(cfb);
        // Loop Over Each Sheet
        wb.SheetNames.forEach(function(sheetName) {
            // Obtain The Current Row As CSV
            var sCSV = XLS.utils.make_csv(wb.Sheets[sheetName]);   
            var oJS = XLS.utils.sheet_to_row_object_array(wb.Sheets[sheetName]);   

            document.getElementById('display').innerHTML(sCSV);
            console.log(oJS);
        });
    };

    // Tell JS To Start Reading The File.. You could delay this if desired
   
}
