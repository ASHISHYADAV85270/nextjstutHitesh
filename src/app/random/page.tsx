"use client";
import toast, { Toaster } from 'react-hot-toast';
export default function randomPage() {
    toast.success("Password Updated")
    return (
        <div className="flex justify-center items-center mt-3 text-red-600">
            PASSWORD RESETED SUCCESSFULLY
            <Toaster />
        </div>);
}
