import connectMongo from "@/helpers/connectMongo";
import { ROLES } from "@/helpers/roles";
import { useGetServerSession } from "@/hooks/useGetServerSession";
import Order from "@/models/order.model";
import { NextResponse } from "next/server";

export async function GET() {
    const { user } = useGetServerSession()
    if (user?.role !== ROLES.ADMIN.name)
        return NextResponse.json({ error: "شما دسترسی به این بخش را ندارید" }, { status: 401 })

    try {
        await connectMongo()

        return NextResponse.json(await Order.find().populate(["address", "shippingInfo.driver"]))
    } catch (error) {
        console.log(error);
        return NextResponse.json({error: error.message}, {status: 500})
    }
}

export async function PUT(req) {
    const { user } = useGetServerSession()
    if (user?.role !== ROLES.ADMIN.name)
        return NextResponse.json({ error: "شما دسترسی به این بخش را ندارید" }, { status: 401 })

    try {
        await connectMongo()

        const {_id, status} = await req.json()

        await Order.findByIdAndUpdate(_id, {status})

        return NextResponse.json({ message: "وضعیت سفارش با موفقیت تغییر کرد" })
    } catch (error) {
        console.log(error);
        return NextResponse.json({error: error.message}, {status: 500})
    }
}

export async function DELETE(req) {
    const { user } = useGetServerSession()
    if (user?.role !== ROLES.ADMIN.name)
        return NextResponse.json({ error: "شما دسترسی به این بخش را ندارید" }, { status: 401 })

    try {
        await connectMongo()

        const {_id} = await req.json()

        await Order.findByIdAndDelete(_id)

        return NextResponse.json({ message: "سفارش با موفقیت حذف شد" })
    } catch (error) {
        console.log(error);
        return NextResponse.json({error: error.message}, {status: 500})
    }
}