import UserModel from '../models/user.model'

export async function getUserById(req, res, next) {
    try {
        const foundUser = await UserModel.findOne({
            _id: req.params.id,
            deletedAt: null,
        })
        res.status(200).send(foundUser)
    } catch (error) {
        next(error.message)
    }
}

export async function getMe(req, res, next) {
    try {
        const me = await UserModel.findById(req.user.id)
        res.send(me)
    } catch (error) {
        next(error.message)
    }
}

export async function getListUser(req, res, next) {
    try {
        const { ids, email, fullName, page, limit, sort } = req.params
        const conditions = { deletedAt: null }
        if (ids?.length) {
            conditions.ids = { $in: ids }
        }
        if (email) {
            conditions.email = { $regex: new RegExp(email, 'i') }
        }
        if (fullName) {
            conditions.fullName = { $regex: new RegExp(fullName, 'i') }
        }
        UserModel.find(conditions, (err, data) => {
            if (err) {
                next(err)
            }
            res.send(data)
        })
    } catch (error) {
        next(error)
    }
}
