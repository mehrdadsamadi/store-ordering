import connectMongo from "@/helpers/connectMongo";
import { ROLES } from "@/helpers/roles";
import { useGetServerSession } from "@/hooks/useGetServerSession";
import Product from "@/models/product.model";
import { NextResponse } from "next/server";

export async function GET() {
    const {user} = useGetServerSession()
    if(user?.role !== ROLES.ADMIN)
        return NextResponse.json({error: "شما دسترسی به این بخش را ندارید"}, {status: 401})

    try {
        await connectMongo()

        return NextResponse.json(await Product.find().populate(["category", "brand", "specs"]))
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

        await Product.create(body)
        
        return NextResponse.json({message: "مشخصات با موفقیت ایجاد شد"})
    } catch (error) {
        console.log(error);
        return NextResponse.json({error: error.message}, {status: 500})
    }
}