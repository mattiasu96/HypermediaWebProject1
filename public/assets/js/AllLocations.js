$(document).ready(function(){

    fetch("/AllLocationsButtons" )
        .then(res => res.json())
        .then(res => {
            addElement(res);
        })
        .then(()=>{
            loadMaterial();
        });

});



function addElement(location){
    location.forEach(loc=>{
        console.log("Adding location: "+loc.name);
        $("#locationList").append('<div class="col-md-4 ml-auto mr-auto"><div class="card card-nav-tabs card-new">' +
            '<a href="./location.html?id=' + loc.id+'" class="btn btn-success opensuse select-card-camminiamo">'+
            '<img class="round25 card-img-top img-fluid" src="'+loc.picture+'" alt="">' +
            '<div class="ripple-container"></div></a>' +
            '<a class="btn btn-success card-header card-title card-header-success" href="./location.html?id=' + loc.id+'">'+loc.name.toUpperCase()+'</a></div>')
    })

}