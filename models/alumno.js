var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Alumno = new Schema({
   noCtrl:{
           type : String,
           require:true
   },

   nombrecompleto: {
        type : String,
        require: true
    },

    carrera:{
        type :String,
        require :true
    },
 
    semestre:{
    
        type: Number,
        enum: ['1','2','3','4','5','6','7','8','9','10','11','12'],
        require:true 
    },
    
    nivel:{
    
        type: String,
        enum: ['A0: Principiante','A1-A2: Básico','A2-B1: Pre-Intermedio','B1: Intermedio','B2: Intermedio-Alto','C1-C2: Avanzado'],
        require:true 
    } 

    }
);

Alumno.path('noCtrl').validate(
        function(v){ 
         return((v!='')&&(v!=null));
        }
);
        
module.exports=mongoose.model('Alumno',Alumno);