"use client"
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function VerifyEmailPage() {





    const router = useRouter();
    const [token, setToken] = useState("");
    const [newpassword, setNewpassword] = useState("");
    const [buttonDisabled, setButtonDisable] = useState(false);
    const [loading, setLoading] = useState(false);

    const changePassword = async () => {

        setLoading(true);
        try {
            const respo = await axios.post('/api/users/resetpassword', { token,newpassword });
            toast.success(respo.data.message);
            router.push('/random');
        } catch (error: any) {
            console.log(error.response.data);
        } finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        if (newpassword.length > 0) {
            setButtonDisable(false);
        } else {
            setButtonDisable(true);
        }
    }, [newpassword])
    useEffect(() => {
        const urlToken = window.location.search.split("=")[1];
        setToken(urlToken || "");
    }, []);


    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2 gap-8">
            <input className="p-2 border text-black border-gray-400 rounded-lg mb-4 focus:outline-none focus:border-gray-900" type="text" id="text" value={token} />

            <label htmlFor="password" className="text-orange-500">{loading ? "waiting" : "Enter the New Password"}</label>
            <input className="p-2 border text-black border-gray-400 rounded-lg mb-4 focus:outline-none focus:border-gray-900" type="password" id="password" value={newpassword} onChange={(e) => setNewpassword(e.target.value)} placeholder="password" />
            {
                loading ? "waiting" : <button className="p-2 border text-white border-gray-400 rounded-lg mb-4 focus:outline-none  bg-slate-950 hover:text-red-400 hover:border-none" onClick={changePassword} disabled={buttonDisabled}>
                    {buttonDisabled ? "No Reset" : "Reset It"}
                </button>
            }
            <hr />
            <Toaster />
        </div>
    )


}
