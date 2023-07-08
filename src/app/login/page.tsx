"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
// import { useRouter } from "next/navigation";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast, { Toaster } from 'react-hot-toast';




export default function LoginUpPage() {
    const router = useRouter();
    const [buttonDisabled, setButtonDisable] = useState(false);
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState({ email: "", password: "" });

    useEffect(() => {
        if (user.email.length > 0 && user.password.length > 0) {
            setButtonDisable(false);
        } else {
            setButtonDisable(true);
        }
    }, [user])
    const onLogin = async () => {
        try {
            setLoading(true);
            const userRes: any = await axios.post('api/users/login', user);
            console.log("user added it is a front end console")
            console.log(userRes);
            toast.success("Login success");
            router.push("/profile");
        } catch (error: any) {
            console.log("user Login  failed", error.message);
            toast.error("Enter valid email or password")
        } finally {
            setLoading(false);
        }
    }
    return (<div className="flex flex-col items-center justify-center min-h-screen py-2">
        <h1>   {loading ? "Waiting" : "Login Page"}</h1>
        <br />
        <label htmlFor="email" >Useremail</label>
        <input className="p-2 border text-black border-gray-400 rounded-lg mb-4 focus:outline-none focus:border-gray-900" type="email" id="email" value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} placeholder="email" />
        <hr />
        <label htmlFor="password" >password</label>
        <input className="p-2 border text-black border-gray-400 rounded-lg mb-4 focus:outline-none focus:border-gray-900" type="password" id="password" value={user.password} onChange={(e) => setUser({ ...user, password: e.target.value })} placeholder="password" />
        <button className="p-2 bordertext-black border-gray-400 rounded-lg mb-4 focus:outline-none  bg-slate-950 hover:text-red-400 hover:border-none" onClick={onLogin} disabled={buttonDisabled}>
            {loading ? "Waiting" : "LoginUp"}</button>
        <Link href="/signup" className="hover:text-red-400"> Visit SignUp</Link>
        <Toaster />

    </div>)
}