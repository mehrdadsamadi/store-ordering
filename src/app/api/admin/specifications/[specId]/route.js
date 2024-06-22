import connectMongo from "@/helpers/connectMongo";
import { ROLES } from "@/helpers/roles";
import { useGetServerSession } from "@/hooks/useGetServerSession";
import Specification from "@/models/specification.model";
import { NextResponse } from "next/server";

export async function GET(_, { params: { specId } }) {
    const { user } = useGetServerSession()
    if (user?.role !== ROLES.ADMIN.name)
        return NextResponse.json({ error: "شما دسترسی به این بخش را ندارید" }, { status: 401 })

    try {
        await connectMongo()

        return NextResponse.json(await Specification.findById(specId).populate(["category", "brand", "product"]))
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}

export async function PUT(req, { params: { specId } }) {
    const { user } = useGetServerSession()
    if (user?.role !== ROLES.ADMIN.name)
        return NextResponse.json({ error: "شما دسترسی به این بخش را ندارید" }, { status: 401 })

    try {
        await connectMongo()

        const body = await req.json()

        await Specification.findByIdAndUpdate(specId, body)

        return NextResponse.json({ message: "مشخصات با موفقیت ویرایش شد" })
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}