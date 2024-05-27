import connectMongo from "@/helpers/connectMongo";
import { ROLES } from "@/helpers/roles";
import { useGetServerSession } from "@/hooks/useGetServerSession";
import Feature from "@/models/feature.model";
import Product from "@/models/product.model";
import { NextResponse } from "next/server";

export async function GET() {
    const { user } = useGetServerSession()
    if (user?.role !== ROLES.ADMIN)
        return NextResponse.json({ error: "شما دسترسی به این بخش را ندارید" }, { status: 401 })

    try {
        await connectMongo()

        return NextResponse.json(await Feature.find().populate(["product"]))
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}

export async function POST(req) {
    const { user } = useGetServerSession()
    if (user?.role !== ROLES.ADMIN)
        return NextResponse.json({ error: "شما دسترسی به این بخش را ندارید" }, { status: 401 })

    try {
        await connectMongo()

        const body = await req.json()

        const existFeature = await Feature.findOne({ product: body.product })
        if (existFeature) {
            await Feature.updateOne({_id: existFeature._id}, {$push: {features: body.features}})
        } else {
            const featureDoc = await Feature.create(body)
            await Product.findByIdAndUpdate(body.product, { features: featureDoc._id })
        }

        return NextResponse.json({ message: "ویژگی ها با موفقیت ایجاد شد" })
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}

export async function DELETE(req) {
    const { user } = useGetServerSession()
    if (user?.role !== ROLES.ADMIN)
        return NextResponse.json({ error: "شما دسترسی به این بخش را ندارید" }, { status: 401 })

    try {
        await connectMongo()

        const body = await req.json()

        await Feature.findByIdAndDelete(body)

        return NextResponse.json({message: "ویژگی با موفقیت حذف شد"})
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}