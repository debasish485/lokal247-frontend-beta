import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(req:NextRequest,context:{params:Promise<{jobUuid:string}>}){
    try {
        const cookieStore=await cookies();
        const token=cookieStore.get("worker_token")?.value;

        if(!token){
            return NextResponse.json({message:"Unauthorized"},{status:401});
        }
        const{jobUuid}=await context.params;

        const backendRes=await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/worker/applied-jobs/${jobUuid}`,{
            method:"GET",
            headers:{
                Authorization:`Bearer ${token}`,
                "Content-Type":"application/json",
            },
            cache:"no-store"
        });
        const data=await backendRes.json();

        if(!backendRes.ok){
            return NextResponse.json(
                {message:data.message || "Failed to fetch application details"},
                {status:backendRes.status},
            );
        }

        return NextResponse.json(data,{status:200});
    } catch (error) {
        console.log("Applied to details job error:",error);
        return NextResponse.json(
            {message:"Something went wrong"},
            {status:500},
        )
    }
}