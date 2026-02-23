

export const dynamic="force-dynamic";

import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(){
    const cookieStore=await cookies();
    const token=cookieStore.get("worker_token")?.value;

    if(!token){
        return NextResponse.json(
            {message:"Unauthorized"},
            {status:401},
        );
    }

    const res=await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/worker/applied-jobs`,{
        headers:{
            Authorization:`Bearer ${token}`,
            "Content-Type":"application/json",
        },
    })

    const data=await res.json();
    return NextResponse.json(data);
};

