import Student from '../student/studentModel.js';
import Course from '../auth/courseModel'; //Verificar la importacion

export const assignCourse = async (req, res) => {
    try {
        // Verificar si el estudiante ya está asignado al máximo de cursos permitidos
        const student = await Student.findById(req.user.id).populate('courses');
        if (student.courses.length >= 3) {
            return res.status(400).json({ message: 'Cannot add more courses because it is already full' });
        }
        //Ver si el estudiante tiene asignado un curso
        if (student.courses.some(course => course._id.toString() === req.params.courseId)) {
            return res.status(400).json({ message: 'You are already assigned to this course' });
        }
        // Verificar si existe un curso dentro del alumno 
        const course = await Course.findById(req.params.courseId);
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }
        student.courses.push(course);
        await student.save();
        res.status(200).json({ message: 'Course assigned successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error assigning course' });
    }
};

export const viewCourses = async (req, res) => {
    try {
        //Obtener todos los cursos disponibles
        const courses = await Course.find();
        res.status(200).json(courses);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener los cursos.' });
    }
};
//estudiante edite su perfil
export const editProfile = async (req, res) => {
    try {
        // Buscar al estudiante por su ID en la DB
        const student = await Student.findById(req.user.id);
        if (!student) {
            return res.status(404).json({ message: 'Estudiante no encontrado.' });
        }
        student.username = req.body.username || student.username;
        student.email = req.body.email || student.email;
        await student.save();
        res.status(200).json({ message: 'Perfil actualizado exitosamente.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al actualizar el perfil.' });
    }
};
//Eliminar el alumno por su ID
export const deleteProfile = async (req, res) => {
    try {
        await Student.findByIdAndDelete(req.user.id);
        res.status(200).json({ message: 'Perfil eliminado exitosamente.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al eliminar el perfil.' });
    }
};
