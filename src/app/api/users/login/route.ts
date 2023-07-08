import { connect } from "@/dbConfig/dbConfig";
import { userModel } from "@/models/userModel.js";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

connect();

export async function POST(request: NextRequest) {
    try {
        console.log("check1")
        const reqBody = await request.json();
        const { email, password } = reqBody;

        let user = await userModel.findOne({ email }).select("+password");

        if (!user) {
            return NextResponse.json({
                success: false,
                message: "Invalid email or password",
            }, { status: 404 })
        }

        const hashpassword = user.password;
        const isMatched = await bcryptjs.compare(password, hashpassword!);
        if (isMatched === false) {
            return NextResponse.json({
                success: false,
                message: "Invalid email or password",
            }, { status: 404 })
        }
        //create user token
        const token = await jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET!, { expiresIn: "1h" });
        const response = NextResponse.json({
            message: "Login successful",
            success: true,
            user: user
        })
        response.cookies.set("token", token, {
            httpOnly: true,
        })
        return response;
    } catch (error: any) {
        console.log("Some Error");
        return NextResponse.json({ success: false, message: "Some Error Occured", error: error.message }, { status: 500 });
    }
}