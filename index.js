const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const sqlDbFactory = require("knex");
const process = require("process");
const _ = require("lodash");


let sqlDb;

function initSqlDB() {
    /* Locally we should launch the app with TEST=true to use SQLlite:

         > TEST=true node ./index.js

      */
    if (process.env.TEST) {
        sqlDb = sqlDbFactory({
            debug: true,
            client: "pg",
            connection: {
                host: 'localhost',
                user: 'postgres',
                password: '',
                database: 'postgres'
            }
        })
    } else {
        sqlDb = sqlDbFactory({
            debug: true,
            client: "pg",
            connection: process.env.DATABASE_URL,
            ssl: true
        });
    }
}


function initLocations() {
    return sqlDb.schema.hasTable("locations").then(exists => {
        if (!exists) {
            sqlDb.schema
                .createTable("locations", table => {
                    table.integer("id").primary();
                    table.string("name");
                    table.string("via");
                    table.text("dettagli");
                    table.string("picture");
                    table.string("phone");
                    table.string("mail");
                    table.text("gmaps");
                })
                .then(() => {
                    return Promise.all(
                        _.map(locationsList, p => {
                            return sqlDb("locations").insert(p);
                        })
                    );
                });
        } else {
            return true;
        }
    });
}

function initDoctors() {
    return sqlDb.schema.hasTable("doctors").then(exists => {
        if (!exists) {
            sqlDb.schema
                .createTable("doctors", table => {
                    table.integer("id").primary();
                    table.string("name");
                    table.string("job");
                    table.text("descrizione");
                    table.text("biografia");
                    table.string("picture");
                    table.string("phone");
                    table.string("mail");
                })
                .then(() => {
                    return Promise.all(
                        _.map(doctorsList, p => {
                            return sqlDb("doctors").insert(p);
                        })
                    );
                });
        } else {
            return true;
        }
    });
}

function initServices() {
    return sqlDb.schema.hasTable("services").then(exists => {
        if (!exists) {
            sqlDb.schema
                .createTable("services", table => {
                    table.integer("id").primary();
                    table.string("name");
                    table.text("descrizione");
                    table.text("dettagli");
                    table.string("picture");
                })
                .then(() => {
                    return Promise.all(
                        _.map(servicesList, p => {
                            return sqlDb("services").insert(p);
                        })
                    );
                });
        } else {
            return true;
        }
    });
}

//Queste sono le tabelle relazionali

function initDocLoc() {
    return sqlDb.schema.hasTable("doc_loc").then(exists => {
        if (!exists) {
            sqlDb.schema
                .createTable("doc_loc", table => {
                    table.increments("id").primary();
                    table.integer("id_doc");
                    table.integer("id_loc");
                    table.unique(["id_doc", "id_loc"]);
                })
                .then(() => {
                    return Promise.all(
                        _.map(doc_locList, p => {
                            return sqlDb("doc_loc").insert(p);
                        })
                    );
                });
        } else {
            return true;
        }
    });
}

function initDocSer() {
    return sqlDb.schema.hasTable("doc_ser").then(exists => {
        if (!exists) {
            sqlDb.schema
                .createTable("doc_ser", table => {
                    table.increments("id").primary();
                    table.integer("id_doc");
                    table.integer("id_ser");
                    table.unique(["id_doc", "id_ser"]);
                })
                .then(() => {
                    return Promise.all(
                        _.map(doc_servList, p => {
                            return sqlDb("doc_ser").insert(p);
                        })
                    );
                });
        } else {
            return true;
        }
    });
}


function initLocServ() {
    return sqlDb.schema.hasTable("loc_ser").then(exists => {
        if (!exists) {
            sqlDb.schema
                .createTable("loc_ser", table => {
                    table.increments("id").primary();
                    table.integer("id_loc");
                    table.integer("id_ser");
                    table.unique(["id_loc", "id_ser"]);
                })
                .then(() => {
                    return Promise.all(
                        _.map(loc_servList, p => {
                            return sqlDb("loc_ser").insert(p);
                        })
                    );
                });
        } else {
            return true;
        }
    });
}


function initLocGallery() {
    return sqlDb.schema.hasTable("loc_gallery").then(exists => {
        if (!exists) {
            sqlDb.schema
                .createTable("loc_gallery", table => {
                    table.increments("pictureId").primary();
                    table.integer("id_loc");
                    table.string("picture");
                })
                .then(() => {
                    return Promise.all(
                        _.map(loc_locGalleryList, p => {
                            return sqlDb("loc_gallery").insert(p);
                        })
                    );
                });
        } else {
            return true;
        }
    });
}

function initFormMessagesTable() {
    return sqlDb.schema.hasTable("form").then(exists => {
        if (!exists) {
            sqlDb.schema
                .createTable("form", table => {
                    table.increments("id");
                    table.string("name");
                    table.string("email");
                    table.text("message");
                    table.timestamp("dateTime");
                })
                .then(() => console.log("tabella form create"));

        } else {
            return true;
        }
    });
}



let serverPort = process.env.PORT || 5000;

let locationsList = require("./other/locations.json");
let servicesList = require("./other/services.json");
let doctorsList = require("./other/doctors.json");
let doc_locList = require("./other/doctor_location.json");
let doc_servList = require("./other/doctor_service.json");
let loc_servList = require("./other/location_service.json");
let loc_locGalleryList = require("./other/locations_gallery.json");


app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


app.get("/allLocationsButtons", function (req, res) {
    let myQuery = sqlDb("locations");
    myQuery
        .select("id", "name", "picture")
        .orderBy("name", "asc")
        .then(result => {
            res.send(JSON.stringify(result));
        });


});


app.get("/allServicesForLocations", function (req, res) {
    let serQuery = sqlDb("services");
    serQuery
        .select("id", "name", "picture")
        .orderBy("name", "asc");

    let locNames = sqlDb("locations");
    locNames
        .select("id", "name")
        .orderBy("name", "asc");

    let locSerQuery = sqlDb("loc_ser");
    locSerQuery
        .orderBy("id_loc", "asc");


    Promise.all([serQuery, locNames, locSerQuery])
        .then(results => {
            let locserResult = results[2];

            let tempArray = [];
            let serForLocArray = [];
            let tempIndex;
            let firstelement;
            let namesLocations = results[1];
            let oldtempIndex;
            firstelement = true;
            let nameLocServicesId = new Object();
            locserResult.forEach(element => {
                    if (firstelement) {
                        tempIndex = element.id_loc;
                        firstelement = false;
                    }
                    if (tempIndex === element.id_loc) {
                        tempArray.push(element.id_ser);
                        oldtempIndex = tempIndex;
                    }
                    else {
                        namesLocations.forEach(el => {
                            if (el.id === oldtempIndex) {
                                nameLocServicesId.id = oldtempIndex;
                                nameLocServicesId.name = el.name;
                            }
                        });
                        nameLocServicesId.services = tempArray;
                        serForLocArray.push(nameLocServicesId);
                        tempArray = [];
                        nameLocServicesId = new Object;
                        tempIndex = element.id_loc;
                        tempArray.push(element.id_ser);
                    }
                }
            );
            namesLocations.forEach(el => {
                if (el.id === tempIndex) {
                    nameLocServicesId.id = tempIndex;
                    nameLocServicesId.name = el.name;
                }
            });
            nameLocServicesId.services = tempArray;
            serForLocArray.push(nameLocServicesId);

            res.send(JSON.stringify([results[0], serForLocArray]));
        });


});



app.get("/allDoctorsButtons", function (req, res) {
    let myQuery = sqlDb("doctors");
    myQuery
        .select("id", "name", "picture", "job")
        .orderBy("name", "asc")
        .then(result => {
            res.send(JSON.stringify(result));
        });


});


app.get("/doctor", function (req, res) {
    let idn = parseInt(req.query.id);

    let serQuery = sqlDb("doc_ser")
        .where("id_doc", idn)
        .select("id_ser");


    let docQuery = sqlDb("doctors")
        .where("id", idn);

    let locQuery = sqlDb("doc_loc")
        .where("id_doc", idn)
        .select("id_loc");


    Promise.all([docQuery, locQuery, serQuery]).then(results => {
        results[0] = results[0][0];
        let array = [];
        results[1].forEach(temp => {
            array.push(temp.id_loc);
        });
        sqlDb("locations")
            .whereIn("id", array)
            .select("id", "name")
            .orderBy("name", "asc")
            .then(risultato => {
                results[1] = risultato;

                let servArray = [];
                results[2].forEach(temp => {
                    servArray.push(temp.id_ser);
                });
                sqlDb("services")
                    .whereIn("id", servArray)
                    .select("id", "name")
                    .orderBy("name", "asc")
                    .then(risultato => {
                        results[2] = risultato;
                        console.log(results);
                        res.send(JSON.stringify(results));
                    })
            })
    })
});


app.get("/service", function (req, res) {
    let idn = parseInt(req.query.id);

    let docQuery = sqlDb("doc_ser")
        .where("id_ser", idn)
        .select("id_doc");


    let serQuery = sqlDb("services")
        .where("id", idn);

    let locQuery = sqlDb("loc_ser")
        .where("id_ser", idn)
        .select("id_loc");


    Promise.all([serQuery, docQuery, locQuery]).then(results => {
        results[0] = results[0][0];
        let docArray = [];
        results[1].forEach(temp => {
            docArray.push(temp.id_doc);
        });
        sqlDb("doctors")
            .whereIn("id", docArray)
            .select("id", "name")
            .orderBy("name", "asc")
            .then(risultato => {
                results[1] = risultato;

                let locArray = [];
                results[2].forEach(temp => {
                    locArray.push(temp.id_loc);
                });
                sqlDb("locations")
                    .whereIn("id", locArray)
                    .select("id", "name")
                    .orderBy("name", "asc")
                    .then(risultato => {
                        results[2] = risultato;
                        console.log(results);
                        res.send(JSON.stringify(results));
                    })
            })
    })
});


app.get("/location", function (req, res) {
    let idn = parseInt(req.query.id);

    let serQuery = sqlDb("loc_ser")
        .where("id_loc", idn)
        .select("id_ser");

    let locQuery = sqlDb("locations")
        .where("id", idn);

    let docQuery = sqlDb("doc_loc")
        .where("id_loc", idn)
        .select("id_doc");

    let galleryQuery = sqlDb("loc_gallery")
        .where("id_loc", idn)
        .select("picture")
        .orderBy("picture", "asc");


    Promise.all([locQuery, serQuery, docQuery, galleryQuery]).then(results => {
        results[0] = results[0][0];
        let array = [];
        results[1].forEach(temp => {
            array.push(temp.id_ser);
        });
        sqlDb("services")
            .whereIn("id", array)
            .select("id", "name")
            .orderBy("name", "asc")
            .then(risultato => {
                results[1] = risultato;

                let docArray = [];
                results[2].forEach(temp => {
                    docArray.push(temp.id_doc);
                });
                sqlDb("doctors")
                    .whereIn("id", docArray)
                    .select("id", "name")
                    .orderBy("name", "asc")
                    .then(risultato => {
                        results[2] = risultato;
                        console.log(results);
                        res.send(JSON.stringify(results));
                    })
            })
    })
});

app.post("/formMessages", function (req, res) {
        let toappend = {
            name: req.body.name,
            email: req.body.email,
            message: req.body.message,
            dateTime: new Date().toISOString()
        };
        sqlDb("form")
            .insert(toappend)
            .then(ids => {
                let id = ids[0];
                console.log(toappend);
                res.send(_.merge({id, toappend}));
            });
    }
);


app.get("/formMessages", function (req, res) {
    let myQuery = sqlDb("form");
    myQuery
        .orderBy("dateTime", "asc")
        .then(result => {
            res.send(JSON.stringify(result));
        });

});


app.set("port", serverPort);

initSqlDB();
initLocations();
initDoctors();
initServices();
initDocLoc();
initDocSer();
initLocServ();
initLocGallery();
initFormMessagesTable();


/* Start the server on port 5000 */
app.listen(serverPort, function () {
    console.log(`Your app is ready at port ${serverPort}`);
});
