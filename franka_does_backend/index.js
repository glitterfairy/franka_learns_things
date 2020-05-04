let db = require('mysql-promise')();
let express = require('express');
//require steht am Anfang, damit sichtbar ist, welche Module dieses Skript verwendet

let init = async () => { // Neue EMSC 6+ Schreibweise fuer Funktionen
  db.configure({
    host: "localhost",
    user: "Franka",
    password: "Sicheres!Passwort2019",
    database: "frankasdb"
  });

  let app = express();
  app.set('view engine', 'pug');

  //app.get('/', function (req, res) { // Pfad: Welche Ressource / Datei möchte ich bekommen?
  //  res.send('Hello World!\n');
  //});

  app.get('/', async (req, res) => {
    let result = await db.query("SELECT * FROM doggos")
    let doggos = result[0]
    console.log(doggos)
    res.render('index', { doggos });
  });

  app.get('/geheim', function (req, res) { // Pfad: Welche Ressource / Datei möchte ich bekommen?
    res.send("Pssssst! It's a secret...\n");
  });

  app.use('/', express.static('../franka_does_frontend/html'));

  app.listen(3000, function () {
    console.log('Franka listening on port 3000!');
  });
}

init()

//ports = für Netzwerkommunikation
//um eine Netzwerkverbindung zu einem anderen Computer herzustellen, werden die IP Adresse und der Port angegeben
//Ports 1-1024 haben festgelegte Funktionen.
