const AnimalSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    especie: { type: String },
    raza: { type: String },
    sexo: { type: String },
    edad: { type: Number },
    estadoSalud: { type: String },
    tipoAlimentacion: { type: String },
    cantidadRecomendada: { type: String },
    frecuenciaRecomendada: { type: String },
    fechaLiberacion: { type: Date },
    ubicacionLiberacion: { type: String }
  });
  
  module.exports = mongoose.model('Animal', AnimalSchema);