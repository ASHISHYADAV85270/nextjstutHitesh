import { connect } from "@/dbConfig/dbConfig";
import userModel from "@/models/userModel.js";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { token, newpassword } = reqBody;
        const user = await userModel.findOne({ forgotPasswordToken: token, forgotPasswordTokenExpiry: { $gt: Date.now() } }).select("+password");
        const hashpassword = await bcryptjs.hash(newpassword, 10);
        user.password = hashpassword;
        user.forgotPasswordToken = undefined;
        user.forgotPasswordTokenExpiry = undefined;
        await user.save();
        return NextResponse.json({
            message: "Password  Reseted ",
            success: true
        }, { status: 200 })
    } catch (error: any) {
        console.log("Some Error");
        return NextResponse.json({ success: false, message: "Some Error Occured", error: error.message }, { status: 500 });
    }
}
