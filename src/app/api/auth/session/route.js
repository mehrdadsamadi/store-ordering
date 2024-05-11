import connectMongo from "@/helpers/connectMongo"
import { useGetServerSession } from "@/hooks/useGetServerSession";
import Session from "@/models/session.model";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
    const {user} = useGetServerSession()

    try {
        await connectMongo()

        return NextResponse.json(user)

    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}

export async function DELETE() {
    const {user} = useGetServerSession()

    try {
        await connectMongo()

        const doc = await Session.deleteOne({ phone: user.phone })

        cookies().delete("user")

        if (doc.deletedCount) {
            return NextResponse.json({ message: "خروج از حساب کاربری با موفقیت انجام شد" })
        } else {
            return NextResponse.json({ error: "خروج نا موفق بود ، بار دیگر امتحان کنید" }, { status: 500 })
        }
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}