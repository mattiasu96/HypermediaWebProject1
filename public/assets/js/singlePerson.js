
$(document).ready(function(){
    console.log("doctor id: "+URL.id); //LOG THE ID OF THE DOCTOR FROM THE PAGE URL

    fetch("/doctor?id=" + URL.id )
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

function addElement(doctor){
    console.log("Adding person details for: "+doctor[0].name);
    $("#PageTitle").append(doctor[0].name+" | CamminiAmo");
    $("#breadCumbTitle").append(doctor[0].name);
    $(".nome").append(doctor[0].name);
    $("#descrizionebreve").append(doctor[0].descrizione);
    $(".biografia").append(doctor[0].biografia);
    $(".foto").append('<img class="img" src="'+doctor[0].picture+'">');

    $(".contacts").append('<a href="tel:"'+doctor[0].phone+' class="btn btn-primary">' +
        '<i class="material-icons">phone</i>'+doctor[0].phone+'</a>\n' +
        '<a href="mailto:'+doctor[0].mail+'" class="btn btn-primary">' +
        '<i class="material-icons">email</i>'+doctor[0].mail+'</a>\n');



    doctor[1].forEach(elemento=>{
        console.log("Adding location for this person. Location name: "+elemento.name);
        $(".strutturelavoro").append('<a href="./location.html?id='+[elemento.id]+'"  class="btn btn-success">'+elemento.name+'</a>\n');
    })
    doctor[2].forEach(elemento=>{
        console.log("Adding services for this person. Serv. name: "+elemento.name);
        $(".serviziofferti").append('<a href="./service.html?id='+[elemento.id]+'"  class="btn btn-danger">'+elemento.name+'</a>\n');
    })



}