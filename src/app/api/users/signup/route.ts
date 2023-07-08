import { connect } from "@/dbConfig/dbConfig";
import {userModel} from "@/models/userModel.js";
import { NextRequest,NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

connect();

export async function POST(request:NextRequest)
{
    try {
        const reqBody=await request.json();
        const {username,password,email}=reqBody;

        //check if user exist
       let user=await userModel.findOne({email});

       //if user is there
       if (user) {
        return NextResponse.json({success:false,message:"User already exist" },{status:500});
       }


       //if  user is not there
       const hashpassword=await bcryptjs.hash(password,10);
       user=await userModel.create({username,email,password:hashpassword});
       console.log(`user data is signup data is ${user}`)
       return NextResponse.json({success:true,message:"User created ",user:user },{status:200});

    } catch (error:any) {
        console.log("Some Error");
        return NextResponse.json({success:false,message:"Some Error Occured",error:error.message },{status:500});
    }
}