import connectMongo from "@/helpers/connectMongo";
import { ROLES } from "@/helpers/roles";
import { useGetServerSession } from "@/hooks/useGetServerSession";
import User from "@/models/user.model";
import { NextResponse } from "next/server";

export async function GET() {
    const {user} = useGetServerSession()
    if(user?.role !== ROLES.ADMIN.name)
        return NextResponse.json({error: "شما دسترسی به این بخش را ندارید"}, {status: 401})
    
    try {
        await connectMongo()

        return NextResponse.json(await User.find())
    } catch (error) {
        console.log(error);
        return NextResponse.json({error: error.message}, {status: 500})
    }
}