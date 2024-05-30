import connectMongo from "@/helpers/connectMongo";
import { ROLES } from "@/helpers/roles";
import { useGetServerSession } from "@/hooks/useGetServerSession";
import Product from "@/models/product.model";
import { NextResponse } from "next/server";

export async function GET(_, { params: { productId } }) {
    const { user } = useGetServerSession()
    if (user?.role !== ROLES.ADMIN)
        return NextResponse.json({ error: "شما دسترسی به این بخش را ندارید" }, { status: 401 })

    try {
        await connectMongo()

        return NextResponse.json(await Product.findById(productId).populate(["category", "brand", "specs", "features"]))
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}

export async function PUT(req, { params: { productId } }) {
    const {user} = useGetServerSession()
    if(user?.role !== ROLES.ADMIN)
        return NextResponse.json({error: "شما دسترسی به این بخش را ندارید"}, {status: 401})
    
    try {
        await connectMongo()

        const body = await req.json()

        await Product.findByIdAndUpdate(productId, body)
        
        return NextResponse.json({message: "محصول با موفقیت ویرایش شد"})
    } catch (error) {
        console.log(error);
        return NextResponse.json({error: error.message}, {status: 500})
    }
}