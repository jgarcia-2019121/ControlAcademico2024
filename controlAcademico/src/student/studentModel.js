import mongoose from 'mongoose';

// Definir el esquema para el modelo de estudiante
const studentSchema = new mongoose.Schema({
  name:{
    type: String,
    required: true
  },
  surname:{
    type: String,
    required: true
  },
  username:{
    type: String,
    unique: true,
    required: true
  },
  password:{
    type: String,
    require: true
  },
  email:{
    type: String,
    required: true
  },
  role:{
    type: String,
    default: 'STUDENT'
  },
  courses:[{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course'
  }]
});

const Student = mongoose.model('Student', studentSchema);
export default Student;
