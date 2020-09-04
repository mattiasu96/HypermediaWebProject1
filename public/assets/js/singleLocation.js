
$(document).ready(function(){
        console.log("location id: "+URL.id); //LOG THE ID OF THE LOCATION FROM THE PAGE URL
    fetch("/location?id=" + URL.id )
        .then(res => res.json())
        .then(res => {
            addElement(res)
        })
        .then(()=>{
            loadMaterial();
        });
});



var URL = function () {
  // This function is anonymous, is executed immediately and 
  // the return value is assigned to QueryString!
  var query_string = {};
  var query = window.location.search.substring(1);
  var vars = query.split("&");
  for (var i=0;i<vars.length;i++) {
    var pair = vars[i].split("=");
        // If first entry with this name
    if (typeof query_string[pair[0]] === "undefined") {
      query_string[pair[0]] = decodeURIComponent(pair[1]);
        // If second entry with this name
    } else if (typeof query_string[pair[0]] === "string") {
      var arr = [ query_string[pair[0]],decodeURIComponent(pair[1]) ];
      query_string[pair[0]] = arr;
        // If third or later entry with this name
    } else {
      query_string[pair[0]].push(decodeURIComponent(pair[1]));
    }
  } 
  return query_string;
}();

function addElement(location){
    console.log("Adding location details for: "+location[0].name);
    $("#PageTitle").append(location[0].name+" | CamminiAmo");
    $("#breadCumbTitle").append(location[0].name);
    $(".nome").append(location[0].name);
    $(".via").append(location[0].via);
    $(".dettagli").append(location[0].dettagli);

    $("#contacts .btn:last").before('<a href="tel:"'+location[0].phone+' class="btn btn-success">' +
        '<i class="material-icons">phone</i>'+location[0].phone+'</a>\n'+
        '<a href="mailto:'+location[0].mail+'" class="btn btn-success">' +
        '<i class="material-icons">email</i>'+location[0].mail+'</a>\n');

    $("#profilePhoto").append('<img class="img" src="'+location[0].picture+'">');
    $("#reachus").append('<iframe src='+location[0].gmaps+'  frameborder="0"  allowfullscreen></iframe>');

    location[1].forEach(elemento=>{
        console.log("Adding services for this location. Serv. name: "+elemento.name);
        $(".servizi").append('<a href="./service.html?id='+[elemento.id]+'"  class="btn btn-danger">'+elemento.name+'</a>\n');
    })
    location[2].forEach(elemento=>{
        console.log("Adding people for this location. Person name: "+elemento.name);
        $(".personale").append('<a href="./person.html?id='+[elemento.id]+'"  class="btn btn-primary">'+elemento.name+'</a>\n');
    })

    location[3].forEach(elemento=>{
        $("#gallery_pictures").append('<div class="col-sm-12 col-md-4">'+
            '<a class="lightbox card card-profile card-plain" href='+elemento.picture+'>'+
            '<div class="btn btn-success card-header card-header-image image-camminiamo">'+
            '<img class="img" src='+elemento.picture+'></div></a></div>');
    })

    baguetteBox.run(".gallery-camminiamo");

    $("#gallery_title").append("Galleria Fotografica di "+location[0].name);

    
}