import mongoose, { Schema } from 'mongoose';

const userSchema = new Schema({
    username: String,
    password: String,
    email: String,
    phones: [String],
    deletedAt: Date,
    fullName: String,
    fullAddress: String,
}, { timestamps: true });

userSchema.statics.findOrFail = async function (conditions) {
    const foundUser = await this.findOne(conditions);
    if (!foundUser) {
        throw new Error('userNotFound');
    }
    return foundUser;
};

userSchema.statics.checkDuplicateUniqInfo = async function (user = {}) {
    const { username, password, email, phones } = user;

    for (const field in { username, password, email, phones }) {
        const isTaken = await this.findOne({
            [field]: user[field],
            deletedAt: null,
        });
        if(isTaken) {
            throw new Error(`${field}Taken`);
        }
    }
}
const UserModel = mongoose.model('User', userSchema);

export default UserModel;