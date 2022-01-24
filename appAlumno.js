// MTI. Ma. Elena Parra Urías
// Dependencies requirements, Express 4
var express        = require('express');
var morgan         = require('morgan');
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');
var mongoose        = require("mongoose");
var app            = express();

app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
//app.use(bodyParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride());


//Add the routes and connection db
routes = require('./routes/controladorAlumno')(app);
mongoose.connect('mongodb://localhost/alumno', function(err, res) {
  if(err) {
    console.log('Error conectando a la  Base de datos de Alumnos...Contacte al Administrador. ' + err);
  } else {
    console.log('Conectado a la Base de Datos  <Alumno>!');
  }
});
app.listen(8000);
console.log('Servidor activo en  8000');
app.get('/', function(req, res) {
  res.send("Listo: Expres, Mongoose y Node.js ");
});