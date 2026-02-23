import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(){
    try {
        const cookieStore=await cookies();
        const token=cookieStore.get("auth_token")?.value;

        if(!token){
            return NextResponse.json(
                {message:"Unauthorized"},
                {status:401}
            );
        }

        const res=await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/recruiter/jobs`,{
            headers:{
                "Authorization":`Bearer ${token}`,
                "Content-Type":"application/json",
            },
        });
        if(!res.ok){
            return NextResponse.json(
                {message:"Failed to fetch jobs"},
                {status:res.status},
            );
        }
        const data=await res.json();
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json(
            {message:"Something went wrong"},
            {status:500}
        );
    }
}
