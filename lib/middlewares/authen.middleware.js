import jwt, { decode } from 'jsonwebtoken'
import AccessTokenModel from '../models/accessToken.model'
export async function authenticationMiddleware(req, res, next) {
    try {
        const authorization = req.get('authorization')

        if (!authorization) {
            throw new Error('Authentication fail!')
        }

        const token = authorization.split(' ')[1]
        const decoded = jwt.verify(token, process.env.SECRET_KEY)
        if (!decoded) {
            throw new Error('Invalid token!')
        }

        const foundToken = await AccessTokenModel.findOne({
            token,
            isActive: true,
        })
        if (!foundToken) {
            throw new Error('not found token')
        }

        req.user = {
            id: decoded.id,
            fullName: decoded.fullName,
        }
        next()
    } catch (error) {
        return next(error.message)
    }
}
