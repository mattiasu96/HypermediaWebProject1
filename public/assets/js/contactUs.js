


$(".contact-form").on('submit', function(event) {
    event.preventDefault();

    var headers = {
        'Content-Type':'application/json',
       'Access-Control-Allow-Origin':'*'
    }


    var data = {
        'name'              : $('input[name=name]').val(),
        'email'             : $('input[name=email]').val(),
        'message'    : $('textarea[name=messageInForm]').val()
    };

    console.log(data);

    fetch("/formMessages", {
        method: "POST",
        headers: headers,
        body:  JSON.stringify(data)
    })

        .then(function(response) {
            if (!response.ok) {
                throw Error(response.statusText);
            }
            $("#form-status").removeClass('text-danger');
            $("#form-status").addClass('text-success');

            // Set the message text.
            $("#form-status").text("Richiesta Inviata");

            // Clear the form.
            $('input[name=name]').val("");
            $('input[name=email]').val("");
            $('textarea[name=messageInForm]').val('');
        }).then(function(response) {
            console.log("ok");
        }).catch(function(error) {
            console.log(error);
            $("#form-status").removeClass('text-success');
            $("#form-status").addClass('text-danger');

                $("#form-status").text("L'invio richiesta non è andato a buon fine. Riprova!");

        });




}
)