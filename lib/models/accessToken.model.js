import mongoose, { Schema } from 'mongoose'

const accessTokenSchema = new Schema(
    {
        owner: Schema.Types.ObjectId,
        token: String,
        isActive: Boolean,
    },
    { timestamps: true }
)

accessTokenSchema.statics.findOrFail = async function (conditions) {
    const foundUser = await this.findOne(conditions)
    if (!foundUser) {
        throw new Error('userNotFound')
    }
    return foundUser
}

accessTokenSchema.methods.recallToken = async function () {
    this.isActive = false
    await this.save()
}

const AccessTokenModel = mongoose.model('access_token', accessTokenSchema)

export default AccessTokenModel
