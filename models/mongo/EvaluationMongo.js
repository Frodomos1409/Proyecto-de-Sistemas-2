const EvaluationSchema = new mongoose.Schema({
    animalId: { type: mongoose.Schema.Types.ObjectId, ref: 'Animal', required: true },
    diagnostico: { type: String, required: true },
    sintomas: { type: String },
    tratamiento: { type: String },
    medicacion: { type: String },
    veterinario: { type: String },
    fechaEvaluacion: { type: Date, default: Date.now },
    proximaRevision: { type: Date }
  }, { timestamps: true });
  
  module.exports = mongoose.model('Evaluation', EvaluationSchema);