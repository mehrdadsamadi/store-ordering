import connectMongo from "@/helpers/connectMongo";
import User from "@/models/user.model";
import { NextResponse } from "next/server"

export async function POST(req) {
    try {
        await connectMongo()
        
        const { phone, ...rest } = await req.json()

        await User.updateOne({ phone }, { ...rest })

        return NextResponse.json({ message: "اطلاعات شما با موفقیت ثبت شد" })
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}