import connectMongo from "@/helpers/connectMongo"
import { setCookie } from "@/helpers/cookies";
import Session from "@/models/session.model";
import User from "@/models/user.model";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        await connectMongo()

        const { phone: phoneNumber, code } = await req.json()
        
        const user = await User.findOne({ phone: phoneNumber })
        if (!user) {
            return NextResponse.json({ error: "کاربری با این شماره همراه یافت نشد" }, { status: 404 })
        }

        if (user?.otp?.code !== Number(code)) {
            return NextResponse.json({ error: "کد ارسال شده صحیح نمیباشد" }, { status: 401 })
        }

        const now = new Date().getTime()
        if (+user.otp.expiresIn < +now) {
            return NextResponse.json({ error: "کد شما منقضی شده است ، کد جدید دریافت کنید" }, { status: 401 })
        }

        const {first_name, last_name, phone, role, avatar} = user

        const oneWeek = 7 * 24 * 60 * 60 * 1000;

        await Session.deleteOne({phone})
        await Session.create({phone, role, expire: Date.now() + oneWeek})

        setCookie({first_name, last_name, phone, role, avatar})
        
        return NextResponse.json({first_name, last_name, phone, role})
        
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}