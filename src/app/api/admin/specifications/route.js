import connectMongo from "@/helpers/connectMongo";
import { ROLES } from "@/helpers/roles";
import { useGetServerSession } from "@/hooks/useGetServerSession";
import Brand from "@/models/brand.model";
import Category from "@/models/category.model";
import Product from "@/models/product.model";
import Specification from "@/models/specification.model";
import { NextResponse } from "next/server";

export async function GET() {
    const { user } = useGetServerSession()
    if (user?.role !== ROLES.ADMIN)
        return NextResponse.json({ error: "شما دسترسی به این بخش را ندارید" }, { status: 401 })

    try {
        await connectMongo()

        return NextResponse.json(await Specification.find().populate(["category", "brand", "product"]))
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

        const specDoc = await Specification.create(body)

        if (body?.product) {
            await Product.findByIdAndUpdate(body.product, { specs: specDoc._id })
        } else if (body?.category) {
            await Category.findByIdAndUpdate(body.category, { specs: specDoc._id })
        } else {
            await Brand.findByIdAndUpdate(body.brand, { specs: specDoc._id })
        }

        return NextResponse.json({ message: "مشخصات با موفقیت ایجاد شد" })
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}