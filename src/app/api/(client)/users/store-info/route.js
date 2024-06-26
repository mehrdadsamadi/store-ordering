import connectMongo from "@/helpers/connectMongo";
import { useGetServerSession } from "@/hooks/useGetServerSession";
import Store from "@/models/store.model";
import { NextResponse } from "next/server"

export async function POST(req) {
    const { user } = useGetServerSession()
    if (!user)
        return NextResponse.json({ error: "ابتدا در حساب کاربری خود لاگین کنید" }, { status: 401 })

    try {
        await connectMongo()

        const body = await req.json()

        await Store.create({...body, ownerId: user._id})

        return NextResponse.json({ message: "اطلاعات شما با موفقیت ثبت شد" })
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}

export async function PUT(req) {
    const { user } = useGetServerSession()
    if (!user)
        return NextResponse.json({ error: "ابتدا در حساب کاربری خود لاگین کنید" }, { status: 401 })

    try {
        await connectMongo()

        const body = await req.json()

        await Store.findOneAndUpdate({ phone: body.phone }, body)

        return NextResponse.json({ message: "اطلاعات شما با موفقیت ویرایش شد" })

    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}