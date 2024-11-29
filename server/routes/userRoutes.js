import express from 'express';
import {
    createUser,
    deteleUserById,
    getAllUsers,
    getUserById,
    loginUser,
    registerUser,
} from '../controllers/user.controllers.js';
import authorize from '../middlewares/autorize/authorizeUsers.js';

const router = express.Router();

router.route('/').post(createUser).get(getAllUsers);

router.route('/me').get(authorize, getUserById);

router.route('/register').post(registerUser);

router.route('/login').post(loginUser);

router.route('/:id').get(authorize, getUserById).delete(deteleUserById);

export default router;
