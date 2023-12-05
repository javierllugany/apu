const mongoose = require('mongoose');

const counterSchema = new mongoose.Schema({
  id:{
    type: mongoose.Id,
  },
  tipo: {
    type: String //taller, evento
  },
  titulo:{
    type:String,
    required:true,
    maxLength:255,
  },
  descripcion:{
    type: String,
    required: true,
  },
  fecha: {
    type: Date,
  },
  dias:{
    type: String,
    maxLength:255,
  },
  horario:{
    type: String,
    maxLength:255,
  },
  lugar:{
    type: String,
    maxLength:255,
  },
  tallerista: {
    type: String,
    maxLength:255,
  },
  organiza: {
    type: String,
    maxLength:255,
  },
  images:[{
    url: String,
    title: String,
  }],
  audios:[{
    url: String,
    description: String,
  }],
  videolink:{
    url: String,
    iframe: String,
  },
  frontpage:{
    type: Boolean,
    default: true,
  },
});

counterSchema.index({'$**': 'text'}, {default_language: "spanish" });

module.exports = mongoose.model('Entrada',counterSchema);
