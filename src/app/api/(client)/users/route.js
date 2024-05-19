import connectMongo from "@/helpers/connectMongo";
import { setCookie } from "@/helpers/cookies";
import Session from "@/models/session.model";
import User from "@/models/user.model";
import { NextResponse } from "next/server"

export async function PUT(req) {
    try {
        await connectMongo()

        const { phone, first_name, last_name, role, avatar } = await req.json()

        await User.updateOne({ phone }, { first_name, last_name, role, avatar })

        await Session.updateOne({ phone }, { role })

        setCookie({ phone, first_name, last_name, role, avatar })

        return NextResponse.json({ message: "اطلاعات شما با موفقیت ثبت شد" })
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}