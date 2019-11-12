/*
$(function(){
  //Access-Control-Allow-Headers: *
$("#p1").on('click', function(){
$("#p1").html('my new panel conent');
});
$.ajax({
    xhrFields: {
        withCredentials: true
    },
    type: "GET",
    url: "https://www.w3.org/TR/cors/"
}).done(function (data) {
    console.log(data);
});

});*/

//setInterval(function () {
function myFunction(res) {
  document.write(res);
}

function getCORS(url, success,_callback) {
    var xhr = new XMLHttpRequest();
    if (!('withCredentials' in xhr)) xhr = new XDomainRequest(); // fix IE8/9
      xhr.open('GET', url);
      xhr.onload = success;
      xhr.send();
    return xhr;
}

// example request
var res = 'ahoj';
getCORS('https://www.idnes.cz/zpravy', function(request){
    var response = request.currentTarget.response || request.target.responseText;
    res = response;
  //  console.log(response);
myFunction(res);
$(function(){
$(".list-art").slideUp(20000).slideDown(10000);
});
});
//}, 5000
//);
