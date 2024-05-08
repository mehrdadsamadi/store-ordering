import connectMongo from "@/helpers/connectMongo";
import User from "@/models/user.model";
import { NextResponse } from "next/server";

export async function GET() {
    await connectMongo()

    await User.create({ first_name: "مهرداد", last_name: "صمدی مقدم", phone: "09371567428", role: "ADMIN" })

    return NextResponse.json({ message: "حساب کاربری با موفقیت ایجاد شد" })
}

export async function POST(req) {
    try {
        const { phone, ...rest } = await req.json()

        await User.updateOne({ phone }, { ...rest })

        return NextResponse.json({ message: "اطلاعات شما با موفقیت ثبت شد" })
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}