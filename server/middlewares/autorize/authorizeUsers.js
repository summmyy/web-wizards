import jwt from 'jsonwebtoken';

const authorize = async (req, res, next) => {
    if (req.headers.authorization) {
        try {
            const token = req.headers.authorization.split('Bearer ')[1];
            const decodeJwt = jwt.decode(token);
            if (!decodeJwt) throw new Error('Invalid JWT token');
            const payload = jwt.verify(token, process.env.JWT_SECRET);
            req.query.userId = payload.userId;
            next();
        } catch (error) {
            res.status(401).send({
                name: error.name,
                message: error.message,
                code: error.code,
            });
        }
    } else {
        res.status(401).send({
            name: 'No token',
            message: 'No token on the request header',
            code: 401,
        });
    }
};

export default authorize;
