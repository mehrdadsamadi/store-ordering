import connectMongo from "@/helpers/connectMongo";
import Session from "@/models/session.model";
import User from "@/models/user.model";
import { cookies } from "next/headers";
import { NextResponse } from "next/server"

export async function POST(req) {
    try {
        await connectMongo()

        const { phone, first_name, last_name, role, avatar } = await req.json()

        await User.updateOne({ phone }, { first_name, last_name, role, avatar })

        await Session.updateOne({phone}, {role})

        const oneWeek = 7 * 24 * 60 * 60 * 1000
        cookies().set('user', JSON.stringify({phone, first_name, last_name, role}), { expires: Date.now() + oneWeek })

        return NextResponse.json({ message: "اطلاعات شما با موفقیت ثبت شد" })
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}