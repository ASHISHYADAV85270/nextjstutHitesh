import { NextResponse } from "next/server";
export async function GET(response: NextResponse) {
    try {
        const response = NextResponse.json({ success: true, message: "Logout successfully" });
        response.cookies.set("token", "", { httpOnly: true, expires: new Date(0) });
        console.log("logout done ,,, i am backend");
        return response;
    } catch (error: any) {
        console.log(error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}