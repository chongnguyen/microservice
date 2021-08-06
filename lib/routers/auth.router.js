import express from 'express';

import { 
    login, register, logout,
    getListUser, getUserById, getMe,
} from '../controllers';
import { loginValidator } from '../validators/auth.validate.js';
import { authenticationMiddleware } from '../middlewares';

const router = express.Router();

/** [POST] /users/register */
router.post('/register', register);
/** [POST] /users/login */
router.post('/login', loginValidator, login);
/** [POST] /users/logout */
router.post('/logout', logout);

/** [GET] /users/detail/:id */
router.get('/detail/:id', authenticationMiddleware, getUserById);
/** [GET] /users/list */
router.get('/list', authenticationMiddleware, getListUser);
/** [GET] /users/me */
router.get('/me', authenticationMiddleware, getMe);

export default router;