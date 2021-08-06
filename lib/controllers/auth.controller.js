import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { token } from 'morgan';
import AccessTokenModel from '../models/accessToken.model';
import UserModel from '../models/user.model';

export async function login(req, res, next) {
    try {
        const { username, password, saveLogin } = req.body;

        const foundUser = await UserModel.findOrFail({ username, deletedAt: null });

        const isValidPass = bcrypt.compareSync(password, foundUser.password);
        if (!isValidPass) {
            throw new Error('wrongPassword');
        }
        const duration = saveLogin ? process.env.TOKEN_DURATION_SAVED : process.env.TOKEN_DURATION;
        const token = jwt.sign(
            {
                id: foundUser.id,
                fullName: foundUser.fullName,
            },
            process.env.SECRET_KEY, 
            { expiresIn: duration }
        );

        await AccessTokenModel.updateOne(
            { owner: foundUser.id },
            {
                isActive: true,
                token,
            },
            { upsert: true },
        );
        res.status(200).send({
            accessToken: token,
        });
    } catch (error) {
        next(error.message);
    }
}

export async function register(req, res, next) {
    try {
        const { password } = req.body;

        await UserModel.checkDuplicateUniqInfo(req.body);

        const hashPass = bcrypt.hashSync(password, 10);

        const user = new UserModel({
            ...req.body,
            password: hashPass,
        });

        const token = jwt.sign(
            {
                id: user.id,
                fullName: user.fullName,
            },
            process.env.SECRET_KEY, 
            { expiresIn: process.env.TOKEN_DURATION }
        );
        await AccessTokenModel.updateOne(
            { owner: user.id },
            {
                isActive: true,
                token,
            },
            { upsert: true},
        );

        res.send({
            user,
            token,
        });
        await user.save();
    } catch (error) {
        next(error.message);
    }
};

export async function logout(req, res, next) {
    try {
        const { id } = req.body;

        await AccessTokenModel.updateOne(
            { owner: id },
            { isActive: false },
        );
        res.send('logout successfully');
    } catch (error) {
        
    }
}