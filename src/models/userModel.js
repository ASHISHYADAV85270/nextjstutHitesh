import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please Provide a username"]
    },
    email: {
        type: String,
        required: [true, "Please Provide a email"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Please Provide a password"],
        select: false,
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date,
});


const userModel = mongoose.models.users || mongoose.model("users", userSchema);
export default userModel;   