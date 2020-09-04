$(document).ready(function(){

    fetch("/allServicesForLocations" )
        .then(res => res.json())
        .then(res => {
            addElement(res[0],res[1])
        })
        .then(()=>{
            loadMaterial();
        });

});





function addElement(serviceButtons,locationServices){
    serviceButtons.forEach(elemento=> {
        console.log("Adding service: "+elemento.name);
        $(".allservizi").append('<div class="col-md-4 ml-auto mr-auto"><div class="card card-nav-tabs card-new"><a  href="./service.html?id=' + elemento.id + '" type="button" class=" btn btn-danger redhat select-card-camminiamo" ><img class="round25 card-img-top img-fluid" src="' + elemento.picture + '" alt="Card image cap" ></a><a class="btn btn-danger card-header card-title card-header-danger  margin-camminiamo" href="./service.html?id=' + elemento.id + '" >' + elemento.name + '</a></div></div>\n');

    });

    locationServices.forEach(elemento=> {
        console.log("Adding location: "+elemento.name);
        $("#locationMenu").append('<li class="nav-item"><a class="nav-link" href="#' + elemento.id + '" data-toggle="tab">' + elemento.name.toUpperCase() + '</a></li>')
    });

    console.log("Adding services to single locations");
    locationServices.forEach(elemento=> {

        $(".tab-content").append('<div class="tab-pane" id='+elemento.id+'><div class="text-center"><div id="app'+elemento.id+'" class="row">');
        let serInThisLocation;
        serviceButtons.forEach(el=>{
            if (elemento.services.includes(el.id))
                $("#app"+elemento.id).append('<div class="col-md-4 ml-auto mr-auto"><div class="card card-nav-tabs card-new"><a  href="./service.html?id=' + el.id + '" type="button" class="btn btn-danger redhat select-card-camminiamo" ><img class="round25 card-img-top img-fluid" src="' + el.picture + '" alt="Card image cap" ></a><a class="btn btn-danger card-header card-title card-header-danger  margin-camminiamo" href="./service.html?id=' + el.id + '" >' + el.name + '</a></div></div>\n');
        });

        $(".tab-content").append('</div></div></div>');


    });
    console.log("Finished adding services to single locations");

}


