"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
// import { useRouter } from "next/navigation";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast, { Toaster } from 'react-hot-toast';




export default function ForgetPassword() {
    const router = useRouter();
    const [buttonDisabled, setButtonDisable] = useState(false);
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState({ email: "" });

    useEffect(() => {
        if (user.email.length > 0) {
            setButtonDisable(false);
        } else {
            setButtonDisable(true);
        }
    }, [user])
    const onForget = async () => {
        try {
            setLoading(true);
            const userRes: any = await axios.post('api/users/forgetpassword', user);
            toast.success(userRes.data.message);
            router.push('/login');
        } catch (error: any) {
            toast.error(error.response.data.message);
        } finally {
            setLoading(false);
        }
    }
    return (<div className="flex flex-col items-center justify-center min-h-screen py-2">
        <h1 className="text-xl text-orange-500">   {loading ? "Waiting" : "Forget Password Page"}</h1>
        <br />
        <h1>   We will send the reset Link to the registered id</h1>

        <br />
        <label htmlFor="email" >Useremail</label>
        <input className="p-2 border text-black border-gray-400 rounded-lg mb-4 focus:outline-none focus:border-gray-900" type="email" id="email" value={user.email} onChange={(e) => setUser({ email: e.target.value })} placeholder="email" />
        <hr />
        <button className="p-2  rounded-lg mb-4  hover:text-red-400 " onClick={onForget} disabled={buttonDisabled}>
            {loading ? "Waiting" : "Send Reset Link"}</button>
        <Link href="/login" className="hover:text-red-400"> Visit Login</Link>
        <Toaster />

    </div>)
}