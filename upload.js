window.addEventListener('load',()=>{
    var request = window.location.href;
    var service = unbuildEndodedUri(request);
    console.log(service);
})
function upload(){
    console.log("File Upload API in progress");
}
