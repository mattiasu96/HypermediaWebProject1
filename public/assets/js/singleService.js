
$(document).ready(function(){
        console.log("service id: "+URL.id); //LOG THE ID OF THE SERVICE FROM THE PAGE URL
        fetch("/service?id=" + URL.id )
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

function addElement(service){
    console.log("Adding service details for: "+service[0].name);
    $("#PageTitle").append(service[0].name+" | CamminiAmo");
    $("#breadCumbTitle").append(service[0].name);
    $(".nome").append(service[0].name);
    $(".descrizione").append(service[0].descrizione);
    $("#dettagli").append(service[0].dettagli);
    $("#profilePhoto").append('<img class="img" src="'+service[0].picture+'">');
    
    service[1].forEach(elemento=>{
        console.log("Adding people for this service. Person name: "+elemento.name);
        $(".offertoda").append('<a href="./person.html?id='+[elemento.id]+'"  class="btn btn-primary">'+elemento.name+'</a>\n');
    })
    service[2].forEach(elemento=>{
        console.log("Adding location for this service. Location name: "+elemento.name);
        $(".location").append('<a href="./location.html?id='+[elemento.id]+'"  class="btn btn-success">'+elemento.name+'</a>\n');
    })

    
}