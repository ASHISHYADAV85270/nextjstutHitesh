"use client";



import toast, { Toaster } from 'react-hot-toast';

export default function testintoast() {
    const rand=()=>{
        toast.success("hii");
        console.log("first")
    }
    return (
    <div className="flex justify-center items-center mt-3 border-red-400 border-solid border-2">
        <button onClick={rand}>hii</button>
        <Toaster />
    </div>);
    // return(<div>hello</div>)

}
