import connectMongo from "@/helpers/connectMongo";
import { ROLES } from "@/helpers/roles";
import { useGetServerSession } from "@/hooks/useGetServerSession";
import Feature from "@/models/feature.model";
import { NextResponse } from "next/server";

export async function GET(_, { params: { featureId } }) {
    const { user } = useGetServerSession()
    if (user?.role !== ROLES.ADMIN)
        return NextResponse.json({ error: "شما دسترسی به این بخش را ندارید" }, { status: 401 })

    try {
        await connectMongo()

        return NextResponse.json(await Feature.findById(featureId).populate(["product"]))
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}

export async function PUT(req, { params: { featureId } }) {
    const { user } = useGetServerSession()
    if (user?.role !== ROLES.ADMIN)
        return NextResponse.json({ error: "شما دسترسی به این بخش را ندارید" }, { status: 401 })

    try {
        await connectMongo()

        const body = await req.json()

        await Feature.findByIdAndUpdate(featureId, body)

        return NextResponse.json({ message: "ویژگی ها با موفقیت ویرایش شد" })
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}