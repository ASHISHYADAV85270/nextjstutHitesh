"use client";
import React, { useState } from "react";
import Link from "next/link";
// import { useRouter } from "next/navigation";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function LoginUpPage() {

    const [user, setUser] = useState({ email: "", password: ""});
    const onLogin=async()=>{
        
    }
    return (<div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>Login Page</h1>
         <br />
            <label htmlFor="email" >Useremail</label>
            <input className="p-2 border text-gray-400 border-gray-400 rounded-lg mb-4 focus:outline-none focus:border-gray-900" type="email"  id="email" value={user.email}  onChange={(e)=>setUser({...user,email:e.target.value})} placeholder="email"/>
            <hr />
            <label htmlFor="password" >password</label>
            <input className="p-2 border text-gray-400 border-gray-400 rounded-lg mb-4 focus:outline-none focus:border-gray-900" type="password"  id="password" value={user.password}  onChange={(e)=>setUser({...user,password:e.target.value})} placeholder="password"/>
            <button  className="p-2 border text-gray-400 border-gray-400 rounded-lg mb-4 focus:outline-none  bg-slate-950 hover:text-red-400 hover:border-none" onClick={onLogin}>Login UP</button>
            <Link href="/signup" className="hover:text-red-400"> Visit SignUp</Link>
    </div>)
}