import connectMongo from "@/helpers/connectMongo";
import { useGetServerSession } from "@/hooks/useGetServerSession";
import Bid from "@/models/bid.model";
import Order from "@/models/order.model";
import { NextResponse } from "next/server";

export async function PUT(req) {
    const {user} = useGetServerSession()
    if(!user)
        return NextResponse.json({error: "ابتدا در حساب کاربری خود لاگین کنید"}, {status: 401})

    try {
        await connectMongo()

        const {orderId, shippingCost} = await req.json()
        
        const bidDocs = await Bid.create({driver: user._id, order: orderId, shippingCost})
        await Order.findByIdAndUpdate(orderId, {shippingInfo: bidDocs._id})

        return NextResponse.json({message: "قیمت پیشنهادی شما با موفقیت ثبت شد"})
    } catch (error) {
        console.log(error);
        return NextResponse.json({error: error.message}, {status: 500})
    }
}