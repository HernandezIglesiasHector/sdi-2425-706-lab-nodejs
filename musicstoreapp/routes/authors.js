module.exports = function (app) {

    app.get("/authors", function (req, res) {
        let authors = [{
            "name": "Quevedo",
            "group": "Buenas noches",
            "role": "cantante"
        }, {
            "name": "Bruce Sprinting",
            "group": "Bruce",
            "role": "Guitarrista"
        }, {
            "name": "Bad Bunny",
            "group": "nslqvapm",
            "role": "cantante"
        }];
        let response = {
            seller: "Autores",
            authors: authors
        };
        res.render("authors/authors.twig", response);
    });

    app.get('/authors/add', function (req, res) {
        res.render("authors/add.twig");
    });

    app.post('/authors/add', function (req, res) {
        let response = "";
        if (req.body.name !== null && typeof(req.body.name) != "undefined" && req.body.name.trim() !== "") {
            response = "Nombre: " + req.body.name + "<br>";
        } else {
            response += "name no enviado en la petición" + "<br>";
        }
        if (req.body.role !== null && typeof(req.body.role) != "undefined" && req.body.role.trim() !== "") {
            response = "Rol: " + req.body.role + "<br>";
        } else {
            response += "rol no enviado en la petición" + "<br>";
        }
        if (req.body.group !== null && typeof(req.body.group) != "undefined" && req.body.group.trim() !== "") {
            response += "Grupo: " + req.body.group + "<br>";
        } else {
            response += "group no enviado en la petición" + "<br>";
        }

        res.send(response);
    });

    app.get("/authors/*", function (req, res) {
        res.redirect("/authors");
    });
    app.get("/author*", function (req, res) {
        res.redirect("/authors");
    });
}