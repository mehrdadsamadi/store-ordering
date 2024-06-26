import connectMongo from "@/helpers/connectMongo";
import { useGetServerSession } from "@/hooks/useGetServerSession";
import Product from "@/models/product.model";
import { NextResponse } from "next/server";

export async function GET() {
    const {user} = useGetServerSession()
    if(!user)
        return NextResponse.json({error: "ابتدا در حساب کاربری خود لاگین کنید"}, {status: 401})

    try {
        await connectMongo()

        return NextResponse.json(await Product.find({visible: true}).populate(["category", "brand", "specs", "features"]))
    } catch (error) {
        console.log(error);
        return NextResponse.json({error: error.message}, {status: 500})
    }
}