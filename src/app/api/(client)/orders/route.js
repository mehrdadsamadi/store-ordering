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
        
        return NextResponse.json(await Order.find().populate(["address", "shippingInfo"]))
    } catch (error) {
        console.log(error);
        return NextResponse.json({error: error.message}, {status: 500})
    }
}

export async function POST(req) {
    const {user} = useGetServerSession()
    if(!user)
        return NextResponse.json({error: "ابتدا در حساب کاربری خود لاگین کنید"}, {status: 401})

    try {
        await connectMongo()

        const body = await req.json()

        const endBiddingAt = new Date(new Date().getTime() + 30 * 60 * 1000); // 30 دقیقه بعد

        await Order.create({...body, userPhone: user.phone, endBiddingAt})

        return NextResponse.json({message: "سفارش شما با موفقیت ثبت شد ، از بخش سفارشات میتوانید سفارش خود را پیگیری کنید"})
    } catch (error) {
        console.log(error);
        return NextResponse.json({error: error.message}, {status: 500})
    }
}