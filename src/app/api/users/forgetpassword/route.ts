import { connect } from "@/dbConfig/dbConfig";
import userModel from "@/models/userModel.js";
import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "@/helpers/mailer";
import { toast } from "react-hot-toast";
connect();
export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { email } = reqBody;
        //check if user exist
        let user = await userModel.findOne({ email });
        if (!user) {
            return NextResponse.json({ message: "Invalid Email" }, { status: 400 })
        }
        await sendEmail({ email, emailType: "RESET", userId: user._id });
        return NextResponse.json({ success: true, message: "Forget Email Send" }, { status: 200 });

    } catch (error: any) {
        return NextResponse.json({ message: "Some error from backend" }, { status: 400 });
    }
}