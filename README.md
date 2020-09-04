# General information about the team and the web application

* Heroku URL: https://polimi-hyp-2018-team-10525863.herokuapp.com/
* Bitbucket repo URL: https://bitbucket.org/polimi-hyp-2018-team-10525863/polimi-hyp-2018-project/
* Team administrator: Luca, Zorzenon, 10525863, polimi-hyp-2018-10525863
* Team member n.2 : Guido, Sergi, 10494956, polimi-hyp-2018-10494956
* Team member n.3 : Mattia, Suricchio, 10495606, polimi-hyp-2018-10495606

# Description of the REST API
List of the endpoints of our API with the accepted query strings.

| Node endpoint |	HTTP Method | Details | Accepted query strings |
|--------|-------------|------------|------|
| /allLocationsButtons | GET | Server Endpoint to get the list of all locations in alphabetical order with these fields: *name, id, picture*. It's used to populate "the locations.html" page. ||
| /allDoctorsButtons| GET | Server Endpoint to get the list of all doctors in alphabetical order with these fields: *name, id, picture*. It's used to populate the "people.html" page. |
| /allServicesForLocations | GET | Server Endpoint to get the list of all services offered anywhere in alphabetical order (with these fields: *name, id, picture*), the location's names and the relationships between locations and services. It's used to populate the "services.html" page. |
| /location?id=00 | GET | Server Endpoint to get the details of a single location and the names and Ids of services and doctors related to that location. It's used to populate the "location.html" page.|id = identifier of the location in the database. The ID is extracted from the URL ("/location?id=" + URL.id ) via javascript (singleLocation.js).|
| /doctor?id=00 | GET | Server Endpoint to get the details of a single doctor and the names and Ids of services and locations related to that doctor. It's used to populate the "person.html" page. |id = identifier of the doctor in the database. The ID is extracted from the URL ("/doctor?id=" + URL.id ) via javascript (singlePerson.js).|
| /service?id=00 | GET | Server Endpoint to get the details of a single service and the names and Ids of doctors and locations related to that service. It's used to populate the "service.html" page.|id = identifier of the service in the database The ID is extracted from the URL ("/service?id=" + URL.id ) via javascript (singleService.js).|
| /formMessages| POST | Used to save the input data from the form (present in "contactus.html") in the database. Accepts as body of request a Json stringified variable with fields *name, email, message*.|
| /formMessages| GET | Server Endpoint to get the list of all messages send with the form in chronological order with these fields: *id, name, email, message, dateTime*. **This is used only to test the correctness of the POST method.**|

