import { getDataFromToken } from "@/helpers/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";
import userModel from "@/models/userModel";
import { connect } from "@/dbConfig/dbConfig";
connect();
export async function GET(request: NextRequest) {
    try {
        const userId = await getDataFromToken(request);
        let user = await userModel.findById(userId).select("-password");
        return NextResponse.json({ success: true, message: "User found", user: user }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ success: false, message: "Please login first", user: "No data" }, { status: 400 });
    }
}