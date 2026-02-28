import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const BASE_URL=process.env.NEXT_PUBLIC_BASE_URL;

export async function POST(req:NextRequest,context:{params:Promise<{jobId:string}>}){
    try {
        const cookieStore=await cookies();
        const token=cookieStore.get("worker_token")?.value;
        const {jobId}=await context.params;
        if(!token){
            return NextResponse.json({message:"Unauthorized"},{status:401});
        }
        const body=await req.json();
        const backendRes=await fetch(`${BASE_URL}/api/worker/jobs/${jobId}/apply`,{
            method:"POST",
            headers:{
                Authorization:`Bearer ${token}`,
                Accept:"application/json",
                "Content-Type":"application/json",
            },
            body:JSON.stringify(body)
        });

        const data=await backendRes.json();
        return NextResponse.json(data,{status:backendRes.status});
    } catch (error) {
        console.log("Apply job error",error);
        return NextResponse.json({message:"Apply Failed"},{status:500});
    }

}