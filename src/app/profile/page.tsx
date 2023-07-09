"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

import toast, { Toaster } from "react-hot-toast";


export default function ProfilePage() {
    const router = useRouter();
    const [userdata, setUserdata] = useState({ username: "", email: "" });



    const logout = async () => {
        try {
            const respo = await axios.get('/api/users/logout');
            toast.success(respo.data.message);
            router.push("/login");
        } catch (error: any) {
            console.log(error.message);
            toast.error(error.message);
        }
    }



    const getuserData = async () => {
        try {
            const respo: any = await axios.get('/api/users/me');
            setUserdata({ username: respo.data.user.username, email: respo.data.user.email });
            console.log("data", userdata);
            toast.success(`hi ${respo.data}`);
        } catch (error: any) {
            toast.error(error.message);
        }
    }
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2 gap-4">
            <h1>Profile</h1>
            <hr />
            <br />
            <p>Profile page</p>

            <hr />
            <button
                onClick={logout}
                className="bg-blue-500 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >Logout</button>

            <button
                onClick={getuserData}
                className="bg-green-800 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >GetUser Details</button>
            {userdata.username}
            <br />
            {userdata.email}
        </div>)
}