import jwt from 'jsonwebtoken';

// validacion de Maddlewares
export const validateJwt = (req, res, next) => {
    const token = req.headers.authorization;
    const currentRoute = req.path;
    const publicRoutes = ['/api/auth/login', '/api/courses'];
    if (publicRoutes.includes(currentRoute)) {
        return next();
    }
    if (!token) {
        return res.status(401).json({ message: 'Authentication token not provided' });
    }
    try {
        // Verificar y decodificar el token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        console.error(error);
        return res.status(401).json({ message: 'Invalid authentication token' });
    }
};
export const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send({ message: 'Internal Server Error' });
};



