import connectMongo from "@/helpers/connectMongo";
import { useGetServerSession } from "@/hooks/useGetServerSession";
import Order from "@/models/order.model";
import { NextResponse } from "next/server";

export async function PUT(req) {
    const {user} = useGetServerSession()
    if(!user)
        return NextResponse.json({error: "ابتدا در حساب کاربری خود لاگین کنید"}, {status: 401})

    try {
        await connectMongo()

        const {orderId, shippingCost} = await req.json()
        await Order.findByIdAndUpdate(orderId, {shippingInfo : {driver: user._id, shippingCost}})

        return NextResponse.json({message: "قیمت پیشنهادی شما با موفقیت ثبت شد"})
    } catch (error) {
        console.log(error);
        return NextResponse.json({error: error.message}, {status: 500})
    }
}