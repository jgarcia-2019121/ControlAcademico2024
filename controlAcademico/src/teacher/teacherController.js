import Course from '../auth/courseModel.js';
import Student from '../student/studentModel.js';

//Crear un nuevo curso
export const createCourse = async (req, res) => {
    try {
        const newCourse = await Course.create({
            name: req.body.name,
            description: req.body.description,
            teacher: req.user.id
        });
        res.status(201).send({ message: `Course ${newCourse} successfully created` });

    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Error creating course' });
    }
};

//editar curso
export const editCourse = async (req, res) => {
    try {
        const course = await Course.findOne({ _id: req.params.id, teacher: req.user.id })
        if (!course) {
            return res.status(404).send({ message: 'Course not found or unauthorized' })
        }
        //Comprobar si la actualizacion del curso funciona y guardar los cambios
        course.name = req.body.name || course.name;
        course.description = req.body.description || course.description;
        await course.save();
        res.status(200).send({ message: `Course ${course} successfully updated` });
    } catch (error) {
        console.error(error)
        res.status(500).send({ message: 'Error updating course' })
    }
}

//Eliminar un curso
export const deleteCourse = async (req, res) => {
    try {
        const course = await Course.findOne({ _id: req.params.id, teacher: req.user.id })
        if (!course) {
            return res.status(404).send({ message: 'Course not found or unauthorized' });
        }
        //Quitar a un estudiante de su curso
        await Student.updateMany({ courses: req.params.id }, { $pull: { courses: req.params.id } });
        //Eliminar el curso que tiene asignado el alumno
        await course.remove();
        res.status(200).send({ message: 'Course successfully deleted' })
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Error deleting course' });

    }
};
//obtener los cursos por ID asociados a un profesor
export const getCoursesForTeacher = async (req, res) => {
    try {
        const teacherId = req.user._id;
        //Buscar los cursos por su ID y traer el profesor
        const courses = await Course.find({ teacher: teacherId });
        if (!courses || courses.length === 0) {
            return res.status(404).json({ message: 'No courses found for this teacher' });
        }
        res.status(200).send(courses);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Internal server error' });
    }
};