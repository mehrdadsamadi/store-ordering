import connectMongo from "@/helpers/connectMongo";
import { ROLES } from "@/helpers/roles";
import { useGetServerSession } from "@/hooks/useGetServerSession";
import Brand from "@/models/brand.model";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        await connectMongo()

        return NextResponse.json(await Brand.find())
    } catch (error) {
        console.log(error);
        return NextResponse.json({error: error.message}, {status: 500})
    }
}

export async function POST(req) {
    const {user} = useGetServerSession()
    if(user?.role !== ROLES.ADMIN)
        return NextResponse.json({error: "شما دسترسی به این بخش را ندارید"}, {status: 401})

    try {
        await connectMongo()
    
        const body = await req.json()

        await Brand.create(body)
        
        return NextResponse.json({message: "برند با موفقیت ایجاد شد"})
    } catch (error) {
        console.log(error);
        return NextResponse.json({error: error.message}, {status: 500})
    }
}

export async function DELETE(req) {
    const {user} = useGetServerSession()
    if(user?.role !== ROLES.ADMIN)
        return NextResponse.json({error: "شما دسترسی به این بخش را ندارید"}, {status: 401})

    try {
        await connectMongo()
    
        const body = await req.json()

        await Brand.findByIdAndDelete(body)
        
        return NextResponse.json({message: "برند با موفقیت حذف شد"})
    } catch (error) {
        console.log(error);
        return NextResponse.json({error: error.message}, {status: 500})
    }
}