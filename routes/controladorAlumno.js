var Alumno= require('../models/alumno.js');

module.exports = function(app) {

  /**
   * Find and retrieves all vehicles
   * @param {Object} req HTTP request object.
   * @param {Object} res HTTP response object.
   */
  findAllalumnos = function(req, res) {
    console.log("GET - /alumno");
    return Alumno.find(function(err, alumno) {
      if(!err) {
        return res.send(alumno);
      } else {
        res.statusCode = 500;
        console.log('Internal error(%d): %s',res.statusCode,err.message);
        return res.send({ error: 'Server error' });
      }
    });
  };



  /**
   * Find and retrieves a single vehicle by its ID
   * @param {Object} req HTTP request object.
   * @param {Object} res HTTP response object.
   */
  findById = function(req, res) {

    console.log("GET - /alumno/:id");
    return Alumno.findById(req.params.id, function(err, alumno) {

      if(!alumno) {
        res.statusCode = 404;
        return res.send({ error: 'Not found' });
      }

      if(!err) {
        return res.send({ status: 'OK', alumno:alumno });
      } else {

        res.statusCode = 500;
        console.log('Internal error(%d): %s', res.statusCode, err.message);
        return res.send({ error: 'Server error' });
      }
    });
  };




  /**
   * Creates a new vehicle from the data request
   * @param {Object} req HTTP request object.
   * @param {Object} res HTTP response object.
   */
  addalumno = function(req, res) {

    console.log('POST - /alumno');

//Obtener parámetros de entrada

var alumno = new Alumno({
	noCtrl :  req.body.noCtrl,
    nombrecompleto : req.body.nombrecompleto,
    carrera : req.body.carrera,
    semestre: req.body.semestre,
    nivel: req.body.nivel
  }
);


    alumno.save(function(err) {

      if(err) {

        console.log('Error al intentar <guardar> alumno...Verifique con el administrador. ' + err);
        res.send({ error:err });
        return;

      } else {

        console.log("Alumno creado.");
        return res.send({ status: 'OK', alumno:alumno });

      }

    });

  };



  /**
   * Update a vehicle by its ID
   * @param {Object} req HTTP request object.
   * @param {Object} res HTTP response object.
   */
  updatealumno = function(req, res) {

    console.log("PUT - /alumno/:id");
    return Alumno.findById(req.params.id, function(err, alumno) {

      if(!alumno) {
        res.statusCode = 404;
        return res.send({ error: 'Not found' });
      }
      //Actualizar los parámetros y sean diferente de nulo
      if(req.body.noCtrl!=null) alumno.noCtrl=req.body.noCtrl;
      if(req.body.nombrecompleto!=null) alumno.nombrecompleto=req.body.nombrecompleto;
      if(req.body.carrera!=null) alumno.carrera=req.body.carrera;
      if(req.body.semestre!=null) alumno.semestre=req.body.semestre;
      if(req.body.nivel!=null) alumno.nivel=req.body.nivel;

     
    

      return alumno.save(function(err) {
        if(!err) {
          console.log('Updated');
          return res.send({ status: 'OK', alumno:alumno });
        } else {
          if(err.name == 'ValidationError') {
            res.statusCode = 400;
            res.send({ error: 'Validation error' });
          } else {
            res.statusCode = 500;
            res.send({ error: 'Server error' });
          }
          console.log('Internal error(%d): %s',res.statusCode,err.message);
        }

        res.send(alumno);

      });
    });
  };



  /**
   * Delete a vehicle by its ID
   * @param {Object} req HTTP request object.
   * @param {Object} res HTTP response object.
   */
  deletealumno = function(req, res) {

    console.log("DELETE - /alumno/:id");
    return Alumno.findById(req.params.id, function(err, alumno) {
      if(!alumno) {
        res.statusCode = 404;
        return res.send({ error: 'Not found' });
      }

      return alumno.remove(function(err) {
        if(!err) {
          console.log('Removed alumno');
          return res.send({ status: 'OK' });
        } else {
          res.statusCode = 500;
          console.log('Internal error(%d): %s',res.statusCode,err.message);
          return res.send({ error: 'Server error' });
        }
      })
    });
  }

  //Link routes and actions
  app.get('/alumno',findAllalumnos);
  app.get('/alumno/:id',findById);
  app.post('/alumno',addalumno);
  app.put('/alumno/:id',updatealumno);
  app.delete('/alumno/:id',deletealumno);
  
  
}