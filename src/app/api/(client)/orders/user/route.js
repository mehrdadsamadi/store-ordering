import connectMongo from "@/helpers/connectMongo";
import { useGetServerSession } from "@/hooks/useGetServerSession";
import Order from "@/models/order.model";
import { NextResponse } from "next/server";

export async function GET() {
    const {user} = useGetServerSession()
    if(!user)
        return NextResponse.json({error: "ابتدا در حساب کاربری خود لاگین کنید"}, {status: 401})

    try {
        await connectMongo()
        
        return NextResponse.json(await Order.find({userPhone: user.phone}).populate("address"))
    } catch (error) {
        console.log(error);
        return NextResponse.json({error: error.message}, {status: 500})
    }
}