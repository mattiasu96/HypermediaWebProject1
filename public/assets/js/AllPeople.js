$(document).ready(function(){

    fetch("/AllDoctorsButtons" )
        .then(res => res.json())
        .then(res => {
            addElement(res);
        })
        .then(()=>{
            loadMaterial();
        });


});


function addElement(doctor){
    doctor.forEach(doc=>{
        console.log("Adding doctor: "+doc.name);
        $("#peopleList").append('<div class="col-md-4 ml-auto mr-auto"><a href="./person.html?id='+doc.id+'" ' +
            'class="card card-profile card-plain"><div class="btn btn-primary card-header card-header-image image-camminiamo">' +
            '<img class="img" src="'+doc.picture+'"></div><div class="card-body "><h3 class="card-title">'+doc.name+'</h3>' +
            '<h4>Dott. in '+doc.job+'</h4></div></a></div>');
    })

}
